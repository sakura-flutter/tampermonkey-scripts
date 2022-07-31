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
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'func-call-spacing': 'off', // 泛型多参数时空格有点问题
      },
    },
  ],
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
