module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    // 为了兼容原有js文件
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: [
        '@typescript-eslint', // 同 @typescript-eslint/eslint-plugin
      ],
      parserOptions: {
        project: './tsconfig.json',
        // ecmaFeatures: {
        //   jsx: true,
        // },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  globals: {
    unsafeWindow: 'readonly',
    GM_registerMenuCommand: 'readonly',
    GM_setValue: 'readonly',
    GM_getValue: 'readonly',
    GM_deleteValue: 'readonly',
    GM_listValues: 'readonly',
    GM_addValueChangeListener: 'readonly',
    GM_removeValueChangeListener: 'readonly',
    GM_xmlhttpRequest: 'readonly',
    GM_addStyle: 'readonly',
    GM_setClipboard: 'readonly',
    GM_getResourceText: 'readonly',
    Toast: 'readonly',
  },
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
}
