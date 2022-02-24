module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': [2, 'single'],
    'import/no-unresolved': 0,
    'require-jsdoc': 0,
    'no-trailing-spaces': 0,
    'no-unused-vars': 0,
    'max-len': [2, {'code': 160}],
    'no-empty-function': 0,
    '@typescript-eslint/no-empty-function': [0],
    'linebreak-style': [0, 'windows'],
  },
};
