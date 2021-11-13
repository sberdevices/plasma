const toUpperKeys = (map) => {
    const upperKeysMap = {};

    Object.keys(map).forEach((key) => {
        upperKeysMap[key.toUpperCase()] = map[key];
    });

    return upperKeysMap;
};

/**
 * Parses the passed macro with the passed data and returns the resulting parsed Macro.
 * If no CACHEBUSTING property is passed in the data it will generate a random one on its own.
 * If no TIMESTAMP property is passed in the data it will generate a one on its own.
 *
 * @ignore
 * @param {string} macro - The string macro to be parsed.
 * @param {Object} data - The data used by the macro.
 * @returns {string} - The parsed macro.
 * @static
 */
const parseMacro = (macro, data = {}) => {
    let parsedMacro = macro;
    const macroData = toUpperKeys(data);

    if (!Boolean(macroData.CACHEBUSTING)) {
        macroData.CACHEBUSTING = Math.round(Math.random() * 1.0e10);
    }

    if (!Boolean(macroData.TIMESTAMP)) {
        macroData.TIMESTAMP = new Date().toISOString();
    }

    Object.keys(macroData).forEach((key) => {
        const value = encodeURIComponent(macroData[key]);

        parsedMacro = parsedMacro.replace(new RegExp("\\[" + key + "\\]", "gm"), value);
    });

    return parsedMacro;
};

export default parseMacro;
