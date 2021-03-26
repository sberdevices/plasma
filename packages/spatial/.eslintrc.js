const prettierrc = require('./.prettierrc.js');

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'prettier/prettier': ['error', { ...prettierrc }],
        'react/prop-types': 'off',
    },
};
