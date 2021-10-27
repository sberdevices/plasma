const fs = require('fs');
const path = require('path');
const { getInput, setOutput, setFailed } = require('@actions/core');

/**
 * Find versions.json with path.
 * @param path
 */
const findVersionsJson = (packageName) => {
    return fs.readFileSync(path.join('website', packageName, 'versions.json')).toString();
};

/**
 * Get version field within package.json
 * @param packageName
 */
const isDocsVersion = (packageName, version) => {
    try {
        const versionJson = findVersionsJson(packageName);
        const json = JSON.parse(versionJson);

        return json.includes(version);
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false; // Assuming that versions.json is not created yet.
        } else {
            throw e;
        }
    }
};

async function main() {
    const packageName = getInput('package-name', { required: true });
    const version = getInput('version', { required: true });
    const docsExists = isDocsVersion(packageName, version);

    setOutput('docs_exists', docsExists);
}

main().catch((err) => setFailed(err.message));
