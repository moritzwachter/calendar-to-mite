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

test('generateEntryFormat return values', () => {
    const mite = new Mite();
    let start = new Date('2020-01-01T00:00:00-02:00');
    let end = new Date(start.getTime() + (60 * 60000));

    const event = {
        start: {dateTime: start},
        end: {dateTime: end},
        summary: 'summary'
    };

    let entry = mite.generateEntryFormat(event, []);

    const expectedResult = {
        date_at: '2020-01-01',
        minutes: 60,
        note: 'summary',
        project_id: 123,
        service_id: 456
    }
    expect(entry).toStrictEqual(expectedResult);
})