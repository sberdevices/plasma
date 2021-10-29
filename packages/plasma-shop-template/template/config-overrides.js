const path = require('path');
const { override, addBabelPlugin, addWebpackResolve, overrideDevServer, watchAll } = require('customize-cra');

module.exports = {
    webpack: override(
        addWebpackResolve({
            modules: [path.resolve(__dirname, 'node_modules')],
        }),
        addBabelPlugin([
            'styled-components',
            {
                displayName: process.env.NODE_ENV === 'development',
            },
        ]),
    ),
    devServer: overrideDevServer(watchAll()),
};
