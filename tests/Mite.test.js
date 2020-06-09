const Mite = require('../src/Mite');

jest.mock('../src/Config', () => ({
    MITE_API_KEY: 'apiKey',
    MITE_ACCOUNT: 'miteAccount',
    INPUT_PATH: 'inputPath',
    GOOGLE_AUTH_DIRECTORY: 'authDirectory'
}));

jest.mock('../src/EventMapper', () => ({
    getProjectAndServiceMapping: () => [123, 456]
}));

test('construction creates new miteApi object', () => {
    const mite = new Mite();
})