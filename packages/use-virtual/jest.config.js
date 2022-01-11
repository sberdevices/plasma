/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],
};
