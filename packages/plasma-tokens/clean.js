const fs = require('fs-extra');

const iosPath = './build/ios-swift/PlasmaTokensColor.swift';

(async () => {
    const file = await fs.readFile(iosPath);

    const content = file.toString();

    const fixAlpha = content.replace(/alpha:/g, 'alpha: ');

    const removeFirstLine = fixAlpha.substring(1);

    await fs.writeFile(iosPath, removeFirstLine);

    console.log('Formatted swift file');
})();
