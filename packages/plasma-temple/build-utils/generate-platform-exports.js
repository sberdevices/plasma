const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const codeDirName = 'src';
const pathToCodeDir = path.join(__dirname, '..', codeDirName);

const directories = ['components'];
const platformRegExp = /(@mobile|@sberbox|@sberportal)$/;
const fileExtRegExp = /\.tsx?$/;

const getFileNameAndExtension = (filePath) => {
    const extension = path.extname(filePath);
    const name = path.basename(filePath, extension);

    return { name, extension };
};

const compareNames = (a, b) => a.toLowerCase() === b.toLowerCase();

const exportItems = {
    mobile: [],
    sberbox: [],
    sberportal: [],
};

const readDirectory = (dirPath, baseDirName) => {
    const directoryItems = fs.readdirSync(dirPath);

    directoryItems.forEach((item) => {
        const itemPath = path.join(dirPath, item);
        const itemInfo = fs.lstatSync(itemPath);

        if (itemInfo.isDirectory()) {
            readDirectory(itemPath, baseDirName);
            return;
        }

        const { name: fileName, extension } = getFileNameAndExtension(itemPath);

        if (!platformRegExp.test(fileName) || !fileExtRegExp.test(extension)) {
            return;
        }

        const code = fs.readFileSync(itemPath, 'utf-8');

        const ast = babel.parseSync(code, {
            sourceType: 'module',
            filename: item,
            configFile: path.join(__dirname, '../babel.config.js'),
        });

        const [componentName, platform] = fileName.split('@');

        babel.traverse(ast, {
            Identifier(astPath) {
                if (
                    (astPath.node.name === componentName ||
                        compareNames(astPath.node.name, `${componentName}${platform}`)) &&
                    astPath.findParent((p) => p.isExportNamedDeclaration())
                ) {
                    const [, relativePath] = itemPath.split(`${codeDirName}/${baseDirName}`);

                    exportItems[platform].push({
                        name: astPath.node.name,
                        alias: componentName,
                        path: `./${baseDirName}${relativePath.replace(fileExtRegExp, '')}`,
                    });
                }
            },
        });
    });
};

const generateExportFiles = () => {
    Object.entries(exportItems).forEach(([platform, exports]) => {
        const code = exports
            .map(({ name, alias, path }) => {
                const exportName = name === alias ? name : `${name} as ${alias}`;
                return `export { ${exportName} } from '${path}';`;
            })
            .join('\n');

        fs.writeFileSync(path.join(pathToCodeDir, `${platform}.generated.ts`), `${code}\n`);
    });
};

directories.forEach((dir) => readDirectory(path.join(pathToCodeDir, dir), dir));
generateExportFiles();
