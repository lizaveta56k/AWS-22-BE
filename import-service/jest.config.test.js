/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    clearMocks: false,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    testMatch: [
      "**/unit/**/*.test.ts"
    ],
    preset: 'ts-jest',
    moduleNameMapper: {
        "@functions/(.*)": ["<rootDir>/src/functions/$1"],
        "@libs/(.*)": ["<rootDir>/src/libs/$1"],
      },
  };