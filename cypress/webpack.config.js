// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

console.log('путь до папки с пакетом');
console.log(process.env.PackageDir);

module.exports = {
    mode: 'development',
    entry: 'src/index.ts',
    devtool: 'inline-source-map',
    devServer: { contentBase: './public' },
    resolve: {
        extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.jsx', '.json', '.map'],
        modules: ['node_modules'],
        alias: {
            react: path.resolve(process.env.PackageDir, 'node_modules', 'react'),
            'react-dom': path.resolve(process.env.PackageDir, 'node_modules', 'react-dom'),
        },
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx$|\.ts$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript', '@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            [
                                'babel-plugin-styled-components',
                                {
                                    displayName: false,
                                    namespace: 'plasma-ui',
                                },
                            ],
                        ],
                        ignore: ['**/*.d.ts', '**/*.stories.tsx'],
                    },
                },
            },
        ],
    },
};
