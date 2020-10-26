module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    unsafeWindow: 'readonly',
    GM_registerMenuCommand: 'readonly',
    GM_setValue: 'readonly',
    GM_getValue: 'readonly',
    GM_deleteValue: 'readonly',
    GM_listValues: 'readonly',
    GM_addValueChangeListener: 'readonly',
    GM_xmlhttpRequest: 'readonly',
    GM_addStyle: 'readonly',
    GM_setClipboard: 'readonly',
    Vue: 'readonly',
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
