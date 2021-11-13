import VideoAdContainer from "./VideoAdContainer";

/**
 * @function
 * @description VideoAdContainer factory method. Returns a VideoAdContainer instance that will contain the video ad.
 *
 * @ignore
 * @static
 * @param {HTMLElement} placeholder - Placeholder element that will contain the video ad.
 * @param {HTMLVideoElement} [videoElement] - optional videoElement that will be used to play the ad.
 *
 * @returns {VideoAdContainer} - Returns a `VideoAdContainer` instance.
 */
const createVideoAdContainer = (placeholder, videoElement) => {
    if (!placeholder) {
        throw new TypeError("placeholder is required");
    }

    return new VideoAdContainer(placeholder, videoElement);
};

export default createVideoAdContainer;
