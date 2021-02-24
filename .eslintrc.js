module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:cypress/recommended',
        'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'import', 'prettier', 'cypress'],
    rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'no-restricted-syntax': 'off', // for...of
        'spaced-comment': ['error', 'always', { markers: ['/'] }], // ts-require directive
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-parens': ['error', 'always'],

        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        indent: 'off',
        'max-len': [
            'error',
            120,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: '*', next: 'if' },
        ],
        'implicit-arrow-linebreak': 'off',
        'no-plusplus': 'off',
        'max-classes-per-file': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        'class-methods-use-this': 'off',
        'no-confusing-arrow': 'off',
        'function-paren-newline': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'warn',
        'space-before-function-paren': 'off',
        'consistent-return': 'off',
        'prettier/prettier': 'error',

        '@typescript-eslint/explicit-function-return-type': 'off',

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
        'react-hooks/exhaustive-deps': 'off', // TODO: https://github.com/sberdevices/plasma/issues/23

        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',

        'import/prefer-default-export': 'off', // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': ['off'],
        'arrow-body-style': 'off',
        'padding-line-between-statements': 'off',
        'no-unused-expressions': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
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
        },
        {
            files: ['*.test.tsx?', '*.test.js'],
            plugins: ['jest'],
            env: {
                browser: true,
                mocha: true,
                'jest/globals': true,
            },
        },
    ],
    settings: {
        react: {
            version: '16.13.1',
        },
    },
};
