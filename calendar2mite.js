const googleAuth = require('./GoogleAuth.js');
const GoogleCalendar = require('./GoogleCalendar');
const dateTime = require('./DateTimeHelper');
const eventMapper = require('./EventMapper');
const mite = require('./Mite');

googleAuth.auth(runApplication);

function runApplication(auth) {
    const calendar = new GoogleCalendar(auth);

    const getEvents = calendar.getEvents(dateTime.getTimeMin(2), dateTime.getTimeMax());
    const getMappings = eventMapper.getMappings();

    Promise.all([getEvents, getMappings])
        .then(values => {
            const [events, mappings] = values

            events.forEach(event => {
                let entry = mite.generateEntryFormat(event, mappings);
                mite.addEntry(entry);
            });
        })
        .catch(err => console.log(err))
    ;
}
