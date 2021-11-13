/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
import { linearEvents } from "../../../../tracker";
import { volumeChanged } from "../../../adUnitEvents";

const { mute, unmute } = linearEvents;
const isMuted = (videoElement) => videoElement.muted || videoElement.volume === 0;

const onVolumeChange = ({ videoElement }, callback) => {
    let wasMuted = isMuted(videoElement);

    const volumechangeHandler = () => {
        callback(volumeChanged);

        if (wasMuted && !isMuted(videoElement)) {
            callback(unmute);
        } else if (!wasMuted && isMuted(videoElement)) {
            callback(mute);
        }

        wasMuted = isMuted(videoElement);
    };

    videoElement.addEventListener("volumechange", volumechangeHandler);

    return () => {
        videoElement.removeEventListener("volumechange", volumechangeHandler);
    };
};

export default onVolumeChange;
