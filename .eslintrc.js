const base = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: [
    'simple-import-sort',
    'sort-keys-fix',
    'sort-destructure-keys',
    'unused-imports',
  ],
  rules: {
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-sort-props': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports.
          [
            '^api',
            '^app',
            '^assets',
            '^components',
            '^containers',
            '^store',
            '^types',
            '^utils',
            '^',
          ],
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: { react: { version: 'detect' } },
}

const ts = Object.assign({}, base, {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:typescript-sort-keys/recommended',
    'prettier',
  ],
  files: ['*.ts', '*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [].concat(base.plugins, ['@typescript-eslint']),
  rules: Object.assign({}, base.rules, {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'error',
  }),
})

module.exports = Object.assign({}, base, { overrides: [ts] })
