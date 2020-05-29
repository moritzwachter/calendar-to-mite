const {google} = require('googleapis');
const googleAuth = require('./googleAuth.js');
googleAuth.auth(runApplication);

require('dotenv').config();
const MITE_API_KEY = process.env.MITE_API_KEY;
const MITE_ACCOUNT = process.env.MITE_ACCOUNT;

const miteApi = require('mite-api');
const mite = miteApi({
    account: MITE_ACCOUNT,
    apiKey: MITE_API_KEY,
    applicationName: 'CalendarToMite'
});

const fs = require('fs');
const csv = require('fast-csv');
const INPUT_PATH = process.env.INPUT_PATH;

async function getMappings() {
    const stream = fs.createReadStream(INPUT_PATH).pipe(csv.parse({ headers: true }));

    return new Promise(function (resolve, reject) {
        const mappings = [];

        stream
            .on('data', row => {
                mappings.push({
                    keyword: row.keyword,
                    projectId: parseInt(row.project, 10),
                    serviceId: parseInt(row.service, 10)
                });
            })
            .on('error', reject)
            .on('end', () => {
                resolve(mappings);
            })
        ;
    });
}

function getProjectAndServiceMapping(mappings, summary) {
    summary = summary.toLowerCase();

    let element = mappings.find(mapping => {
        return summary.indexOf(mapping.keyword.toLowerCase()) > -1;
    });

    if (element) {
        return [element.projectId, element.serviceId];
    }

    return [null, null];
}

function runApplication(auth) {
    const calendar = google.calendar({version: 'v3', auth});

    let today = new Date();
    let sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));

    calendar.events.list({
        calendarId: 'primary',
        timeMin: sevenDaysAgo.toISOString(),
        timeMax: today.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log(events);
        } else {
            console.log('No upcoming events found.');
        }
    });

    getMappings().then(mappings => {
        let eventTitle = 'Some title with #coaching in it';
        const [projectId, serviceId] = getProjectAndServiceMapping(mappings, eventTitle);
        console.log(mappings, serviceId, projectId);
    });
}