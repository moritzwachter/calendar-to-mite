class EventFilter {
    filterIgnoreMappings(events, mappings) {
        let ignoreMappings = mappings.filter(mapping => mapping.ignore);

        return events.filter(event => {
            return ignoreMappings.filter(mapping => {
                return event.summary.indexOf(mapping.keyword.toLowerCase()) !== -1;
            }).length === 0;
        });
    }

    filterMissedMeetings(events) {
        return events.filter(event => {
            let acceptedAttendee = false;
            if (typeof event.attendees !== 'undefined') {
                acceptedAttendee = event.attendees.filter(attendee => {
                    return attendee.self && attendee.responseStatus === 'accepted'
                }).length === 1;
            }

            let organizer = event.organizer.self === true;

            return acceptedAttendee || organizer;
        });
    }
}

module.exports = new EventFilter();