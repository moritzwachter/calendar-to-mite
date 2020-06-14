const EventMapper = require('../src/EventMapper.js');

describe('getProjectAndServiceMapping', () => {
    test('should get correct project and service mapping', () => {
        const mockMappings = [
            {keyword: '#321', projectId: 0, serviceId: 0},
            {keyword: '#123', projectId: 1234, serviceId: 4321},
            {keyword: '#456', projectId: 9876, serviceId: 5432}
        ];

        const [projectId, serviceId] = EventMapper.getProjectAndServiceMapping(mockMappings, 'summary #123');

        expect(projectId).toBe(1234);
        expect(serviceId).toBe(4321);
    });

    test('should return array with two null values', () => {
        const mockMappings = [];
        const [projectId, serviceId] = EventMapper.getProjectAndServiceMapping(mockMappings, 'summary #123');

        expect(projectId).toBe(null);
        expect(serviceId).toBe(null);
    })
});
