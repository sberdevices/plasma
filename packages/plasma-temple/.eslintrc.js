module.exports = {
    extends: ['../../.eslintrc.js'],
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/require-default-props': 'off',
    },
};
