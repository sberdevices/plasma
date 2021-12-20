const coverageDir = process.env.COVERAGE_DIR;

let nycConfig = {};

if (coverageDir) {
    nycConfig = {
        'report-dir': coverageDir,
        'temp-dir': `.nyc_output/${coverageDir}`,
        include: [`**/packages/${process.env.PACKAGE_NAME}/**`],
        exclude: ['**/*.examples.tsx'],
        excludeAfterRemap: true,
    };

    switch (process.env.PACKAGE_NAME) {
        case 'plasma-ui':
            nycConfig.include.push('**/packages/plasma-core/**');
            break;
        case 'plasma-temple':
            nycConfig.exclude.push('**/packages/plasma-temple/testHelpers/**');
            break;
        default:
            break;
    }
}

module.exports = nycConfig;
