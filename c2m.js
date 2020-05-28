const google = require('./google.js');
google.auth(google.listEvents);

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

    return null;
}

getMappings().then(mappings => {
    let eventTitle = 'Some title with #coaching in it';

    const [projectId, serviceId] = getProjectAndServiceMapping(mappings, eventTitle);

    console.log(mappings, serviceId, projectId);
});