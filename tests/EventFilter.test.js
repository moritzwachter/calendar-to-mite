const eventFilter = require('../src/EventFilter')

describe('filterIgnoreMappings', () => {
    it('should return 2 events that are not ignored', () => {
        const mappings = [
            {keyword: '#ignore', projectId: 0, serviceId: 0, ignore: true},
            {keyword: '#123', projectId: 1234, serviceId: 4321, ignore: false},
            {keyword: '#456', projectId: 9876, serviceId: 5432, ignore: false}
        ];

        const events = [
            {summary: '#ignore'},
            {summary: '#123 test'},
            {summary: '#123 another test'},
            {summary: '#32145 #ignored'}
        ];

        const results = eventFilter.filterIgnoreMappings(events, mappings);

        expect(results.length).toBe(2);
        expect(results[0].summary).toBe('#123 test');
        expect(results[1].summary).toContain('another test');
    });

    it('should return 0 events because all are ignored', () => {
        const mappings = [
            {keyword: '#ignore', projectId: 0, serviceId: 0, ignore: true},
            {keyword: '#123', projectId: 1234, serviceId: 4321, ignore: true},
            {keyword: '#456', projectId: 9876, serviceId: 5432, ignore: false}
        ];

        const events = [
            {summary: '#ignore'},
            {summary: '#123 test'},
            {summary: '#123 another test'},
            {summary: '#32145 #ignored'}
        ];

        const results = eventFilter.filterIgnoreMappings(events, mappings);

        expect(results.length).toBe(0);
    });
});

describe('filterMissedMeetings', () => {
    it('should only return the 1 meeting I attended', () => {
        const events = [
            {
                summary: 'event 1',
                attendees: [
                    {displayName: 'user A', self: false, responseStatus: 'accepted'},
                    {displayName: 'user B', self: false, responseStatus: 'accepted'},
                    {displayName: 'user ME', self: true, responseStatus: 'accepted'},
                ]
            },
            {
                summary: 'event 2',
                attendees: [
                    {displayName: 'user A', self: false, responseStatus: 'accepted'},
                    {displayName: 'user B', self: false, responseStatus: 'accepted'},
                    {displayName: 'user ME', self: true, responseStatus: 'declined'},
                ]
            },
        ];

        const result = eventFilter.filterMissedMeetings(events);

        expect(result.length).toBe(1);
        expect(result[0].summary).toBe('event 1');
    });

    it('should return meetings which I organized', () => {
        const events = [
            {
                summary: 'event 1',
                organizer: {displayName: 'user ME', self: true},
                attendees: [
                    {name: 'user A', self: false, responseStatus: 'accepted'},
                    {name: 'user B', self: false, responseStatus: 'declined'},
                ]
            }
        ];

        const result = eventFilter.filterMissedMeetings(events);

        expect(result.length).toBe(1);
        expect(result[0].summary).toBe('event 1');
    });
});