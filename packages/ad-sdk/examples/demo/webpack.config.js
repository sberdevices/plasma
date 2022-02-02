const path = require("path");
const assert = require("assert");

const webpack = require("webpack");

if (process.env.NODE_ENV === "development") {
    assert.ok(process.env.DEV_TOKEN, "Provide DEV_TOKEN");
    assert.ok(process.env.DEV_PHRASE, "Provide DEV_PHRASE");
}

module.exports = {
    entry: "./src/index.js",
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    watch: process.env.NODE_ENV === "development",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.DEV_TOKEN": JSON.stringify(process.env.DEV_TOKEN),
            "process.env.DEV_PHRASE": JSON.stringify(process.env.DEV_PHRASE),
            "process.env.TEST_SURFACE": process.env.TEST_SURFACE ? JSON.parse(process.env.TEST_SURFACE) : null,
            "process.env.INIT_API": JSON.stringify(process.env.INIT_API),
        }),
    ],
};
