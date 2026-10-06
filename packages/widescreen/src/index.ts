import { GM_registerMenuCommand } from '$'
import { RouteMonitor } from './core/route-monitor'
import { WidescreenRuntime } from './core/runtime'
import { SettingsStore } from './core/settings'
import sites from './sites'
import { ControlPanel } from './ui'

function main() {
  const settings = new SettingsStore()
  let runtime: WidescreenRuntime
  const panel = new ControlPanel({
    getPanelPosition: () => settings.getPanelPosition(),
    setPanelPosition: position => settings.setPanelPosition(position),
    onEnabledChange: (siteId, value) => {
      settings.update(siteId, { enabled: value })
      runtime.reconcile()
    },
    onUncappedChange: (siteId, value) => {
      settings.update(siteId, { uncapped: value })
      runtime.reconcile()
    },
  })

  runtime = new WidescreenRuntime({ sites, settings, panel })
  const routeMonitor = new RouteMonitor()
  routeMonitor.subscribe(route => runtime.transition(route))
  settings.subscribe(() => runtime.reconcile())
  panel.setVisible(settings.getPanelVisible())
  registerMenu(panel, settings)

  routeMonitor.start()
}

function registerMenu(panel: ControlPanel, settings: SettingsStore) {
  GM_registerMenuCommand('显示/隐藏 控制按钮', () => {
    const nextStatus = !settings.getPanelVisible()
    settings.setPanelVisible(nextStatus)
    panel.setVisible(nextStatus)
  })
}

main()
