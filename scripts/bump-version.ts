import fs from 'node:fs'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { checkbox, confirm, select } from '@inquirer/prompts'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packagesRoot = path.join(repositoryRoot, 'packages')
const currentScriptPath = path.relative(repositoryRoot, fileURLToPath(import.meta.url)).replaceAll(path.sep, '/')
const versionTypes = ['patch', 'minor', 'major'] as const

type VersionType = (typeof versionTypes)[number]

type ScriptPackage = {
  name: string
  version: string
}

type VersionUpdate = {
  packageInfo: ScriptPackage
  versionType: VersionType
  nextVersion: string
}

class UserCancelledError extends Error {
  constructor() {
    super('操作已取消')
    this.name = 'UserCancelledError'
  }
}

function readPackages(): ScriptPackage[] {
  return fs
    .readdirSync(packagesRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const directory = path.join(packagesRoot, entry.name)
      const manifestPath = path.join(directory, 'package.json')

      if (!fs.existsSync(manifestPath)) return null

      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
        name?: unknown
        version?: unknown
      }
      if (typeof manifest.name !== 'string' || typeof manifest.version !== 'string') return null

      return {
        name: manifest.name,
        version: manifest.version,
      }
    })
    .filter((packageInfo): packageInfo is ScriptPackage => packageInfo !== null)
    .sort((left, right) => left.name.localeCompare(right.name))
}

function ensureInteractiveTerminal(): void {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('版本升级需要在交互式终端中运行')
  }
}

function hasOtherUncommittedChanges(): boolean {
  const readGitPaths = (args: string[]): string[] => {
    const result = spawnSync('git', args, {
      cwd: repositoryRoot,
      encoding: 'utf8',
      windowsHide: false,
    })

    if (result.error) throw result.error
    if (result.status !== 0) throw new Error('无法检查 Git 工作区状态')

    return result.stdout.split('\0').filter(Boolean)
  }

  const unstagedPaths = [
    ...readGitPaths(['diff', '--name-only', '-z', '--']),
    ...readGitPaths(['ls-files', '--others', '--exclude-standard', '-z']),
  ]

  return unstagedPaths.some(changedPath => changedPath.replaceAll('\\', '/') !== currentScriptPath)
}

function bumpVersion(version: string, versionType: VersionType): string {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) throw new Error(`不支持的版本号格式：${version}`)

  let major = Number(match[1])
  let minor = Number(match[2])
  let patch = Number(match[3])

  if (versionType === 'major') {
    major += 1
    minor = 0
    patch = 0
  } else if (versionType === 'minor') {
    minor += 1
    patch = 0
  } else {
    patch += 1
  }

  return `${major}.${minor}.${patch}`
}

function runPnpm(args: string[]): Promise<void> {
  const isWindows = process.platform === 'win32'
  const command = isWindows ? (process.env.ComSpec ?? 'cmd.exe') : 'pnpm'
  const commandArgs = isWindows ? ['/d', '/s', '/c', 'pnpm', ...args] : args

  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      cwd: repositoryRoot,
      stdio: 'inherit',
      windowsHide: false,
    })

    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error(`pnpm ${args.join(' ')} 执行失败，退出码：${code ?? 'unknown'}`))
    })
  })
}

async function main(): Promise<void> {
  ensureInteractiveTerminal()

  const packages = readPackages()
  if (packages.length === 0) throw new Error('没有找到可升级版本的脚本包')

  const selectedPackages = await checkbox({
    message: '选择需要更新版本的脚本包',
    choices: packages.map(packageInfo => ({
      name: `${packageInfo.name.replace('@monkey/', '')} (${packageInfo.version})`,
      value: packageInfo,
    })),
    pageSize: 15,
    required: true,
    shortcuts: { all: 'a' },
  })

  const updates: VersionUpdate[] = []
  for (const packageInfo of selectedPackages) {
    const versionType = await select<VersionType>({
      message: `选择 ${packageInfo.name} 的版本类型（当前 ${packageInfo.version}）`,
      choices: versionTypes.map(type => ({ name: type, value: type })),
    })

    updates.push({
      packageInfo,
      versionType,
      nextVersion: bumpVersion(packageInfo.version, versionType),
    })
  }

  console.log('准备更新：')
  for (const { packageInfo, versionType, nextVersion } of updates) {
    console.log(`  ${packageInfo.name}: ${packageInfo.version} -> ${nextVersion} (${versionType})`)
  }

  if (hasOtherUncommittedChanges()) {
    console.warn('\n警告：工作区存在其他未提交修改。')
    if (!(await confirm({ message: '仍然继续更新版本号？', default: false }))) {
      throw new UserCancelledError()
    }
  }

  for (const { packageInfo, versionType } of updates) {
    await runPnpm(['version', versionType, '--filter', packageInfo.name, '--no-git-tag-version', '--no-git-checks'])
  }

  console.log('\n版本号更新完成。')
  if (!(await confirm({ message: '是否执行 pnpm build？', default: false }))) return

  await runPnpm(['build'])
}

main().catch((error: unknown) => {
  if (error instanceof UserCancelledError || (error instanceof Error && error.name === 'ExitPromptError')) {
    console.log(error.message)
    return
  }

  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
