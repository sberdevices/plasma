const fs = require('fs');
const path = require('path');
const { getInput, setOutput, setFailed } = require('@actions/core');

/**
 * Find package.json with path.
 * @param packageName
 */
const findPackageJson = (packageName) => {
    return fs.readFileSync(path.join('packages', packageName, 'package.json')).toString();
};

/**
 * Get version field within package.json
 * @param packageName
 */
const getPackageVersion = (packageName) => {
    const packageJson = findPackageJson(packageName);
    const json = JSON.parse(packageJson);

    return json.version;
};

async function main() {
    const packageName = getInput('package-name', { required: true });
    const packageVersion = getPackageVersion(packageName);

    setOutput('version', packageVersion);
}

main().catch((err) => setFailed(err.message));
