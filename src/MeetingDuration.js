class MeetingDuration {
    roundDuration(durationInMinutes) {
        let quarterHourPercentile = durationInMinutes / 15; // e.g. 0.66
        return Math.ceil(quarterHourPercentile) * 15;
    }
}

module.exports = new MeetingDuration();