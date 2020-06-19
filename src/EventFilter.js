class EventFilter {
    filterIgnoreMappings(events, mappings) {
        let ignoreMappings = mappings.filter(mapping => mapping.ignore);

        return events.filter(event => {
            const filtered = ignoreMappings.filter(mapping => {
                return event.summary.indexOf(mapping.keyword.toLowerCase()) !== -1;
            });

            return filtered.length === 0;
        });
    }
}

module.exports = new EventFilter();