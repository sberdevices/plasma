/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
import { linearEvents } from "../../../../tracker";

const { impression, creativeView } = linearEvents;

const onImpression = ({ videoElement }, callback) => {
    let started = false;

    const impressionHandler = () => {
        const currentTime = videoElement.currentTime;

        if (!started && currentTime > 0) {
            started = true;
            callback(impression);
            callback(creativeView);
            videoElement.removeEventListener("timeupdate", impressionHandler);
        }
    };

    videoElement.addEventListener("timeupdate", impressionHandler);

    return () => {
        videoElement.removeEventListener("timeupdate", impressionHandler);
    };
};

export default onImpression;
