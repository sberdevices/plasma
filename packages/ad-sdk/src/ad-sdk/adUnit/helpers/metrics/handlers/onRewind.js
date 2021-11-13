/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
import { linearEvents } from "../../../../tracker";

const { rewind } = linearEvents;
const onRewind = ({ videoElement }, callback) => {
    let currentTime = videoElement.currentTime;

    const timeupdateHandler = () => {
        const delta = videoElement.currentTime - currentTime;

        if (delta < 0 && Math.abs(delta) >= 1) {
            callback(rewind);
        }

        currentTime = videoElement.currentTime;
    };

    videoElement.addEventListener("timeupdate", timeupdateHandler);

    return () => {
        videoElement.removeEventListener("timeupdate", timeupdateHandler);
    };
};

export default onRewind;
