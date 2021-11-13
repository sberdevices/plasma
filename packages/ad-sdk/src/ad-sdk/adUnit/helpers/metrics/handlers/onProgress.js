/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
import { linearEvents } from "../../../../tracker";
import formatProgress from "../../progress/formatProgress";

const { progress } = linearEvents;
const secondsToMilliseconds = (seconds) => seconds * 1000;
const isPercentage = (offset) => {
    const percentageRegex = /^\d+(\.\d+)?%$/g;

    return percentageRegex.test(offset) && !isNaN(parseFloat(offset));
};

const isValid = ({ offset, uri }) => {
    const offsetIsValid = typeof offset === "number" || isPercentage(offset);
    const uriIsValid = typeof uri === "string" && uri.length > 0;

    return offsetIsValid && uriIsValid;
};

const offsetToMs = (offset, durationInMs) => {
    if (typeof offset === "number") {
        return offset;
    }

    return (parseFloat(offset) / 100) * durationInMs;
};

const onProgress = ({ videoElement }, callback, { progressEvents = [] } = {}) => {
    const { duration } = videoElement;
    const durationInMs = secondsToMilliseconds(duration);
    let playedMs = 0;
    let previousCurrentTime = secondsToMilliseconds(videoElement.currentTime);
    let pendingEvents = progressEvents.filter(isValid).map(({ offset, uri }) => ({
        offset: offsetToMs(offset, durationInMs),
        uri,
    }));

    const progressHandler = () => {
        const { currentTime } = videoElement;
        const delta = Math.abs(currentTime - previousCurrentTime);

        playedMs += secondsToMilliseconds(delta);
        previousCurrentTime = currentTime;
        const { stillPending, toCall } = pendingEvents.reduce(
            (accumulator, event) => {
                const { offset } = event;

                if (playedMs >= offset) {
                    accumulator.toCall.push(event);
                } else {
                    accumulator.stillPending.push(event);
                }

                return accumulator;
            },
            {
                stillPending: [],
                toCall: [],
            }
        );

        pendingEvents = stillPending;
        toCall.forEach(({ uri }) => {
            callback(progress, {
                contentplayhead: formatProgress(playedMs),
                progressUri: uri,
            });
        });

        if (pendingEvents.length === 0) {
            videoElement.removeEventListener("timeupdate", progressHandler);
        }
    };

    if (pendingEvents.length > 0) {
        videoElement.addEventListener("timeupdate", progressHandler);
    }

    return () => {
        videoElement.removeEventListener("timeupdate", progressHandler);
    };
};

export default onProgress;
