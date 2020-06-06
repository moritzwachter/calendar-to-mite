const EventMapper = require('../src/EventMapper.js');

test('should get correct project and service mapping', () => {
    const mockMappings = [
        {keyword: '#321', projectId: 0, serviceId: 0},
        {keyword: '#123', projectId: 1234, serviceId: 4321}
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

// @TODO: Filesystem tests / mocks
