/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
import { linearEvents } from "../../../../tracker";
import { adProgress } from "../../../adUnitEvents";

const { complete, firstQuartile, midpoint, start, thirdQuartile } = linearEvents;
const percentageProgress = (currentTime, duration) => (currentTime * 100) / duration;
const isPassFirstQuartile = (currentTime, duration) => percentageProgress(currentTime, duration) >= 25;
const isPassMidPoint = (currentTime, duration) => percentageProgress(currentTime, duration) >= 50;
const isPassThirdQuartile = (currentTime, duration) => percentageProgress(currentTime, duration) >= 75;
const isCompleted = (currentTime, duration) => percentageProgress(currentTime, duration) >= 99;

// TODO: implement logic to track `timeSpentViewing` linear event

const onTimeUpdate = ({ videoElement }, callback) => {
    let started = false;
    let passFirstQuartile = false;
    let passMidPoint = false;
    let passThirdQuartile = false;
    let completed = false;

    // eslint-disable-next-line complexity
    const timeupdateHandler = () => {
        const duration = videoElement.duration;
        const currentTime = videoElement.currentTime;

        if (!started && currentTime > 0) {
            started = true;
            callback(start);
        } else if (!passFirstQuartile) {
            if (isPassFirstQuartile(currentTime, duration)) {
                passFirstQuartile = true;
                callback(firstQuartile);
            }
        } else if (!passMidPoint) {
            if (isPassMidPoint(currentTime, duration)) {
                passMidPoint = true;
                callback(midpoint);
            }
        } else if (!passThirdQuartile) {
            if (isPassThirdQuartile(currentTime, duration)) {
                passThirdQuartile = true;
                callback(thirdQuartile);
            }
        } else if (!completed) {
            if (isCompleted(currentTime, duration)) {
                completed = true;
                callback(complete);
            }
        }

        callback(adProgress);
    };

    const endedHandler = () => {
        const duration = videoElement.duration;
        const currentTime = videoElement.currentTime;

        if (!completed && isCompleted(currentTime, duration)) {
            completed = true;
            callback(complete);
        }

        videoElement.removeEventListener("ended", endedHandler);
        videoElement.removeEventListener("timeupdate", timeupdateHandler);
    };

    videoElement.addEventListener("timeupdate", timeupdateHandler);
    videoElement.addEventListener("ended", endedHandler);

    return () => {
        videoElement.removeEventListener("timeupdate", timeupdateHandler);
        videoElement.removeEventListener("ended", endedHandler);
    };
};

export default onTimeUpdate;
