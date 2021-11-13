/* eslint-disable import/max-dependencies */
import onFullscreenChange from "./onFullscreenChange";
import onPlayPause from "./onPlayPause";
import onRewind from "./onRewind";
import onSkip from "./onSkip";
import onError from "./onError";
import onTimeUpdate from "./onTimeUpdate";
import onVolumeChange from "./onVolumeChange";
import onImpression from "./onImpression";
import onProgress from "./onProgress";
import onClickThrough from "./onClickThrough";

const handlers = [
    onClickThrough,
    onError,
    onFullscreenChange,
    onImpression,
    onPlayPause,
    onProgress,
    onRewind,
    onSkip,
    onTimeUpdate,
    onVolumeChange,
];

export default handlers;
