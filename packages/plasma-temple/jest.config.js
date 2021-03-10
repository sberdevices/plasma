const { defaults } = require('jest-config');

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
    transformIgnorePatterns: ["node_modules/(?!(@sberdevices/assistant-client)/)"],
};
