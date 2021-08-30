module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.tsx'],
    moduleNameMapper: {
        '^react(.*)$': '<rootDir>/node_modules/react$1',
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.test.json',
        },
    },
};
