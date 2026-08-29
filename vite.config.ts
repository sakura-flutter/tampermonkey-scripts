import { defineConfig } from 'vite-plus'

export default defineConfig({
  run: {
    tasks: {
      deploy: {
        command: 'gh-pages -d ./dist',
        dependsOn: ['build'],
      },
    },
  },
  staged: {
    '*.{ts,tsx,scss}': 'vp check --fix',
  },
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-unused-expressions': 'off',
      'typescript/no-floating-promises': 'off',
      'typescript/no-this-alias': 'off',
      'typescript/restrict-template-expressions': 'off',
      'typescript/unbound-method': 'off',
    },
  },
  fmt: {
    ignorePatterns: ['dist/**'],
    semi: false,
    singleQuote: true,
    printWidth: 120,
    arrowParens: 'avoid',
  },
  test: {
    include: ['packages/**/*.test.ts', 'shared/**/*.test.ts', 'tools/**/*.test.ts'],
  },
})
