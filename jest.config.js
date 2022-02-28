module.exports = {
    moduleDirectories: ["node_modules"],
    collectCoverageFrom: [
        "**/*.{ts,js}"
    ],
    reporters: ["default"],

    coverageThreshold: {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    },

    testEnvironment: "node",
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)(spec|test).+(ts|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    roots: [
        "./"
    ],
    testURL: "http://localhost/",
}
