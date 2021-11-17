const coverageDir = process.env.COVERAGE_DIR;

let nycConfig = {};

if (coverageDir) {
    nycConfig = {
        'report-dir': coverageDir,
        'temp-dir': `.nyc_output/${coverageDir}`,
        include: [`**/packages/${process.env.PACKAGE_NAME}/**`],
        excludeAfterRemap: true,
    };

    if (process.env.PACKAGE_NAME === 'plasma-ui') {
        nycConfig.include.push('**/packages/plasma-core/**');
    }
}

module.exports = nycConfig;
