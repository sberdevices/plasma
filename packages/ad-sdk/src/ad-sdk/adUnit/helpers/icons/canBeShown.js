const canBeShown = (icon, videoElement) => {
    const currentTimeInMs = videoElement.currentTime * 1000;
    const videoDurationInMs = videoElement.duration * 1000;
    const offset = icon.offset || 0;
    const duration = icon.duration || videoDurationInMs;

    return offset <= currentTimeInMs && currentTimeInMs - offset <= duration;
};

export default canBeShown;
