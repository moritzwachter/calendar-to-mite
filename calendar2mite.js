const googleAuth = require('./GoogleAuth.js');
const GoogleCalendar = require('./GoogleCalendar');
const dateTime = require('./DateTimeHelper');

googleAuth.auth(runApplication);

function runApplication(auth) {
    const calendar = new GoogleCalendar(auth);
    calendar.getEvents(dateTime.getTimeMin(2), dateTime.getTimeMax())
        .then(events => console.log(events))
        .catch(err => console.log(err))
    ;
}
