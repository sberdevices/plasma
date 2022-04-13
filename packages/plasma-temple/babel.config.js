const namespace = process.env.SC_NAMESPACE;

const plugins = [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-annotate-pure-calls',
    [
        'babel-plugin-styled-components',
        {
            displayName: false,
            namespace,
        },
    ],
    [
        'inline-svg',
        {
            exportDataURI: true,
            disableNamespaceIds: true,
        },
    ],
];

const ignore = [
    '**/*.d.ts',
    '**/testHelpers',
    '**/*.stories.tsx',
    '**/*.examples.tsx',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.component-test.ts',
    '**/*.component-test.tsx',
];

process.env.COVERAGE && plugins.push(['babel-plugin-istanbul']);

module.exports = {
    env: {
        cjs: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins,
            ignore,
        },
        esm: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins,
            ignore,
        },
        test: {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
        },
    },
};
