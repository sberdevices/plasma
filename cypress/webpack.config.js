// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelrc = require('../.babelrc');

const rootPath = path.resolve(__dirname, '..');
const packsPath = path.join(rootPath, 'packages');

const dummyModule = `
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
`;

['plasma-web', 'plasma-b2c', 'plasma-ui'].forEach((pack) => {
    const packIndexPath = path.join(packsPath, pack, 'index.js');
    if (!fs.ensureFileSync(packIndexPath)) {
        fs.writeFileSync(packIndexPath, dummyModule);
    }
});

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
                'styled-components': path.resolve(process.env.PACKEGE_DIR, 'node_modules', 'styled-components'),
                react: path.resolve(process.env.PACKEGE_DIR, 'node_modules', 'react'),
                'react-dom': path.resolve(process.env.PACKEGE_DIR, 'node_modules', 'react-dom'),
                '@sberdevices/plasma-icons': path.resolve(
                    process.env.PACKEGE_DIR,
                    'node_modules',
                    '@sberdevices',
                    'plasma-icons',
                ),
                '@sberdevices/plasma-cy-utils': path.resolve(
                    __dirname,
                    '..',
                    'node_modules',
                    '@sberdevices',
                    'plasma-cy-utils',
                ),
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
                        },
                    },
                },
                // В @sberdevices/plasma-temple есть графические ассеты
                // лоадеры для них
                {
                    test: /\.svg$/,
                    use: 'file-loader',
                },
                {
                    test: /\.png$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                mimetype: 'image/png',
                            },
                        },
                    ],
                },
            ],
        },
    };
};
