module.exports = {
    testPathIgnorePatterns: ['/node_modules/', '/__tests__/utils'],
    testEnvironment: 'node',
    setupFiles: ['./client/setupTest/setupTest.js'],
    snapshotSerializers: ['enzyme-to-json/serializer']
};
