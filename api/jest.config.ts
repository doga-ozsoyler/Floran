export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  coverageReporters: ["text", "html"],
  coverageDirectory: "<rootDir>/coverage/",
};
