class DateTimeHelper {
    /**
     * @param {int} amountOfDays
     * @returns {Date}
     */
    getTimeMin (amountOfDays = 7) {
        return new Date(this.getTimeMax().getTime() - (amountOfDays * 24 * 60 * 60 * 1000));
    }

    /**
     * @returns {Date}
     */
    getTimeMax () {
        return new Date();
    }

    /**
     * @param {Date} start
     * @param {Date} end
     * @returns {int}
     */
    getDurationInMinutes(start, end) {
        return (Date.parse(end.toISOString()) - Date.parse(start.toISOString())) / (1000 * 60);
    }

    /**
     * return Date as 'YYYY-MM-DD' string
     *
     * @param {Date} date
     * @returns {string}
     */
    formatDate (date) {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }
}

module.exports = new DateTimeHelper();