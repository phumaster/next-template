module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/*.(test|spec).(ts|tsx)"
  ],
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsConfig: "jest.tsconfig.json",
      diagnostics: true,
      autoMapModuleNames: true
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "config/setupTests.ts",
    ".next"
  ],
  setupFilesAfterEnv: ["<rootDir>/config/setupTests.ts"],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "text-summary"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMocks.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "@/(.*)$": "<rootDir>/$1"
  }
};
