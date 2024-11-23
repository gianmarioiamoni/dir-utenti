export default {
    preset: 'ts-jest/presets/default-esm', // TypeScript with ESM
    testEnvironment: 'node',               // test environment: Node.js
    moduleNameMapper: {                    // mapping for TS/ESM files
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    extensionsToTreatAsEsm: ['.ts'],       // handle .ts files as ES modules
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            useESM: true,
            tsconfig: './tsconfig.test.json'
        }],
    },
};
