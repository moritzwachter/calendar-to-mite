const config = require('./Config.js');
const eventMapper = require('./EventMapper.js');
const dateTime = require('./DateTimeHelper');
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

        return {
            'date_at': dateTime.formatDate(start), // needs to be YYYY-MM-DD
            'minutes': dateTime.getDurationInMinutes(start, end),
            'note': event.summary,
            'project_id': projectId,
            'service_id': serviceId
        };
    }

    addEntry (entry) {
        this.mite.addTimeEntry(entry, (err, res) => console.log(res));
    }
}

module.exports = new Mite();