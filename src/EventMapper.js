const fs = require('fs');
const csv = require('fast-csv');
const config = require('./Config.js');

class EventMapper {
    async getMappings() {
        const stream = fs.createReadStream(config.INPUT_PATH).pipe(csv.parse({ headers: true, delimiter: ';' }));

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

    getProjectAndServiceMapping (mappings, summary) {
        summary = summary.toLowerCase();

        let element = mappings.find(mapping => {
            return summary.indexOf(mapping.keyword.toLowerCase()) !== -1;
        });

        if (element) {
            return [element.projectId, element.serviceId];
        }

        return [null, null];
    }
}

module.exports = new EventMapper();