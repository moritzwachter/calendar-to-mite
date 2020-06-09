const googleAuth = require('./src/GoogleAuth.js');
const GoogleCalendar = require('./src/GoogleCalendar');
const dateTime = require('./src/DateTimeHelper');
const eventMapper = require('./src/EventMapper');
const Mite = require('./src/Mite');

googleAuth.auth(runApplication);

function runApplication(auth) {
    const calendar = new GoogleCalendar(auth);

    const getEvents = calendar.getEvents(dateTime.getTimeMin(2), dateTime.getTimeMax());
    const getMappings = eventMapper.getMappings();
    const mite = new Mite();

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
