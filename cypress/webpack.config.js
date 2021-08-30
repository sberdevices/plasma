// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelrc = require('../.babelrc');

module.exports = function getWebpackConfig() {
    return {
        mode: 'development',
        entry: 'src/index.ts',
        devtool: 'inline-source-map',
        devServer: { contentBase: './public' },
        resolve: {
            extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.jsx', '.json', '.map'],
            modules: ['node_modules'],
            alias: {
                react: path.resolve(process.env.PACKEGE_DIR, 'node_modules', 'react'),
                'react-dom': path.resolve(process.env.PACKEGE_DIR, 'node_modules', 'react-dom'),
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
                            ...babelrc.env.cjs,
                            ignore: ['**/*.d.ts', '**/*.stories.tsx'],
                        },
                    },
                },
            ],
        },
    };
};
