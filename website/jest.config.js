module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
}
