const MeetingDuration = require('../src/MeetingDuration.js');

describe('roundDuration', () => {
    it.each([
        [10, 15],
        [15, 15],
        [16, 30],
        [20, 30],
        [40, 45],
        [50, 60],
        [123, 135],
    ])('should round to next 15 minute unit', (duration, expected) => {
        expect(MeetingDuration.roundDuration(duration)).toBe(expected);
    })
});