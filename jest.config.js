module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/*.ts',
    'src/services/*.ts',
    '!src/utils/*.ts',
    '!src/validation/*.ts',
    '!src/models/*.ts',
    '!src/routes/*.ts',
    '!src/server/*.ts',
    '!src/config/*.ts',
    '!src/middlewares/*.ts',
    '!src/types.ts',
    '!src/app.ts',
  ],
}
