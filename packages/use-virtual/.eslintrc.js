module.exports = {
    extends: ['../../.eslintrc.js'],
    rules: {
        'react/require-default-props': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
