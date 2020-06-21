const googleAuth = require('./src/GoogleAuth.js');
const GoogleCalendar = require('./src/GoogleCalendar');
const dateTime = require('./src/DateTimeHelper');
const eventMapper = require('./src/EventMapper');
const eventFilter = require('./src/EventFilter');
const Mite = require('./src/Mite');

googleAuth.auth(runApplication);

function runApplication(auth) {
    const calendar = new GoogleCalendar(auth);

    const getEvents = calendar.getEvents(dateTime.getTimeMin(2), dateTime.getTimeMax());
    const getMappings = eventMapper.getMappings();

    Promise.all([getEvents, getMappings])
        .then(values => {
            let [events, mappings] = values;
            events = eventFilter.filterIgnoreMappings(events, mappings);
            events = eventFilter.filterMissedMeetings(events);

            events.forEach(event => {
                let entry = Mite.generateEntryFormat(event, mappings);
                Mite.addEntry(entry);
            });
        })
        .catch(err => console.log(err))
    ;
}
