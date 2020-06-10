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
        start: {
            dateTime: start
        },
        end: {
            dateTime: end
        },
        summary: 'summary'
    };

    let entry = mite.generateEntryFormat(event, []);

    expect(entry.project_id).toBe(123);
    expect(entry.service_id).toBe(456);
    expect(entry.note).toBe('summary');
    expect(entry.minutes).toBe(60);
    expect(entry.date_at).toBe('2020-01-01');
})