const DateTimeHelper = require('../src/DateTimeHelper.js');

test('should return date as YYYY-MM-DD', () => {
    let input = '2020-01-01T00:00:00-02:00';
    let result = DateTimeHelper.formatDate(input);

    expect(result).toBe('2020-01-01');
});

test('should return 60 minutes', () => {
    let start = new Date();
    let end = new Date(start.getTime() + (60 * 60000));

    let result = DateTimeHelper.getDurationInMinutes(start, end);
    expect(result).toBe(60);
})
