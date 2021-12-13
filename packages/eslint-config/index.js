module.exports = {
    extends: [
        'airbnb',
        'prettier/react',
        '@sberdevices/eslint-config-base',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react'],
    rules: {
        'react/prop-types': 'off',
        'react/static-property-placement': 'off',
        'react/state-in-constructor': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 'off',
        'react/sort-comp': 'off',
        'react/no-array-index-key': 'off',

        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
    },
    overrides: [
        {
            files: ['*.tsx?'],
            env: {
                browser: true,
            },
            globals: {
                window: true,
                document: true,
            },
        }
    ],
    settings: {
        react: {
            version: '16.13.1',
        },
    },
};
