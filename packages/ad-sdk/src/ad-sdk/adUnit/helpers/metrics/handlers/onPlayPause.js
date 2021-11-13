/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

import { linearEvents } from "../../../../tracker";

const { pause, resume } = linearEvents;

const onPlayPause = ({ videoElement }, callback) => {
    let started = false;
    let paused = true;

    const playHandler = () => {
        if (!started) {
            started = true;
            paused = false;
        } else if (paused) {
            paused = false;
            callback(resume);
        }
    };

    const pauseHandler = () => {
        if (!paused) {
            paused = true;
            callback(pause);
        }
    };

    videoElement.addEventListener("play", playHandler);
    videoElement.addEventListener("pause", pauseHandler);

    return () => {
        videoElement.removeEventListener("play", playHandler);
        videoElement.removeEventListener("pause", pauseHandler);
    };
};

export default onPlayPause;
