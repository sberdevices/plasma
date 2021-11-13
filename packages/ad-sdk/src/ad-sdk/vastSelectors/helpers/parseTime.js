const parseHoursToMs = (hourStr) => parseInt(hourStr, 10) * 60 * 60 * 1000;
const parseMinToMs = (minStr) => parseInt(minStr, 10) * 60 * 1000;
const parseSecToMs = (secStr) => parseInt(secStr, 10) * 1000;
const parseTime = (durationStr) => {
    if (typeof durationStr === "string") {
        const durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
        const match = durationStr.match(durationRegex);

        if (match) {
            const durationInMs =
                parseHoursToMs(match[1]) +
                parseMinToMs(match[2]) +
                parseSecToMs(match[3]) +
                parseInt(match[5] || 0, 10);

            if (!isNaN(durationInMs)) {
                return durationInMs;
            }
        }
    }

    return null;
};

export default parseTime;
