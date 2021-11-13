import { trackError } from "../tracker";
import createVideoAdContainer from "../adContainer/createVideoAdContainer";
import startVideoAd from "./helpers/startVideoAd";

/**
 * Will try to start video ad in the passed {@link VastChain} and return the started VideoAdUnit.
 *
 * @memberof module:video-ad-sdk
 * @static
 * @throws if there is an error starting the ad or it times out (by throw I mean that it will reject promise with the error).
 * @param {VastChain} vastChain - The {@link VastChain} with all the {@link VastResponse}s.
 * @param {HTMLElement} placeholder - placeholder element that will contain the video ad.
 * @param {Object} [options] - Options Map. The allowed properties are:
 * @param {runWaterfall~onAdReady} options.onAdReady - will be called once the ad is ready with the ad unit.
 * @param {HTMLVideoElement} [options.videoElement] - optional videoElement that will be used to play the ad.
 * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 * Defaults to `window.console`
 * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
 * Defaults to `false`
 * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes.
 * Defaults to `false`
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the video ad will time out if it doesn't start within the specified time.
 * @param {TrackerFn} [options.tracker] - If provided it will be used to track the VAST events instead of the default {@link pixelTracker}.
 * @param {Object} [options.hooks] - Optional map with hooks to configure the behaviour of the ad.
 * @param {Function} [options.hooks.createSkipControl] - If provided it will be called to generate the skip control. Must return a clickable [HTMLElement](https://developer.mozilla.org/es/docs/Web/API/HTMLElement) that is detached from the DOM.
 * @param {Function} [options.hooks.getMediaFile] - If provided it will be called to get a {@link MediaFile} by size of the current video element.
 * @returns {Promise.<VastAdUnit|VpaidAdUnit>} - The video ad unit.
 */
const run = async (vastChain, placeholder, options) => {
    let videoAdContainer;

    try {
        const { timeout } = options;

        videoAdContainer = createVideoAdContainer(placeholder, options.videoElement);
        let adUnitPromise = startVideoAd(vastChain, videoAdContainer, options);

        if (typeof timeout === "number") {
            let timedOut = false;
            let timeoutId;
            const timeoutPromise = new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => {
                    const { tracker } = options;

                    trackError(vastChain, {
                        errorCode: 402,
                        tracker,
                    });
                    timedOut = true;
                    reject(new Error("Timeout while starting the ad"));
                }, options.timeout);
            });

            adUnitPromise = Promise.race([
                // eslint-disable-next-line promise/prefer-await-to-then
                adUnitPromise.then((newAdUnit) => {
                    if (timedOut) {
                        if (newAdUnit.isStarted()) {
                            newAdUnit.cancel();
                        }
                    } else {
                        clearTimeout(timeoutId);
                    }

                    return newAdUnit;
                }),
                timeoutPromise,
            ]);
        }

        const adUnit = await adUnitPromise;

        adUnit.onFinish(() => {
            videoAdContainer.destroy();
        });

        return adUnit;
    } catch (error) {
        if (videoAdContainer) {
            videoAdContainer.destroy();
        }

        throw error;
    }
};

export default run;
