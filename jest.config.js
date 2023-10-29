module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/test/.*\\.test\\.ts$",
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
  },
};
