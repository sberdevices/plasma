/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { override, addBabelPlugin, addWebpackResolve } = require("customize-cra");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = override(
    addWebpackResolve({
        modules: path.resolve(__dirname, "node_modules"),
    }),
    addBabelPlugin([
        "styled-components",
        {
            displayName: process.env.NODE_ENV === "development",
        },
    ])
);
