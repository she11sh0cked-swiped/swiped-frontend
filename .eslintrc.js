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
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 6 },
  plugins: [
    'simple-import-sort',
    'sort-keys-fix',
    'sort-destructure-keys',
    'unused-imports',
  ],
  rules: {
    'react/jsx-curly-brace-presence': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
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

const ts = {
  ...base,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  files: ['*.ts', '*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ...base.parserOptions, project: './tsconfig.json' },
  plugins: [...base.plugins, '@typescript-eslint'],
  rules: { ...base.rules, '@typescript-eslint/no-unused-vars': 'off' },
}

module.exports = { ...base, overrides: [ts] }
