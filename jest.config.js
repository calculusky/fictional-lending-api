module.exports = {
    moduleDirectories: ["node_modules"],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx,js,jsx}"
    ],
    reporters: ["default"],
    coverageReporters: [
        "html",
        "text",
        "text-summary",
        "lcov"
    ],
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
        "**/?(*.)(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    roots: [
        "./src/"
    ],
    testURL: "http://localhost/",
}
