const {google} = require('googleapis');

class GoogleCalendar {
    constructor (auth) {
        this.calendar = google.calendar({version: 'v3', auth});
    }

    getEvents(timeMin, timeMax) {
        let events = [];

        return new Promise((resolve, reject) => {
            this.calendar.events.list({
                calendarId: 'primary',
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            }, (err, response) => {
                if (err) reject('The API returned an error: ' + err);

                events = response.data.items;
                if (events.length) {
                    resolve(events);
                } else {
                    reject('No events found.');
                }
            });
        });
    }
}

module.exports = GoogleCalendar;