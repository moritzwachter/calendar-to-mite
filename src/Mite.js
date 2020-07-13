const config = require('./Config.js');
const eventMapper = require('./EventMapper.js');
const dateTime = require('./DateTimeHelper');
const meetingDuration = require('./MeetingDuration');
const miteApi = require('mite-api');

class Mite {
    constructor() {
        this.mite = miteApi({
            account: config.MITE_ACCOUNT,
            apiKey: config.MITE_API_KEY,
            applicationName: 'CalendarToMite'
        });
    }

    generateEntryFormat (event, mappings) {
        let start = new Date(event.start.dateTime);
        let end = new Date(event.end.dateTime);

        const [projectId, serviceId] = eventMapper.getProjectAndServiceMapping(mappings, event.summary);
        const duration = meetingDuration.roundDuration(dateTime.getDurationInMinutes(start, end));

        return {
            'date_at': dateTime.formatDate(start), // needs to be YYYY-MM-DD
            'minutes': duration,
            'note': event.summary,
            'project_id': projectId,
            'service_id': serviceId
        };
    }

    addEntry (entry) {
        this.mite.addTimeEntry(entry, (err, res) => console.log(res.time_entry.note));
    }
}

module.exports = new Mite();