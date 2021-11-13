import { getAdErrorURI, getVastErrorURI } from "../../vastSelectors";
import pixelTracker from "./pixelTracker";

/**
 * Tracks an error.
 *
 * @ignore
 * @param {VastChain} vastChain - the ad VAST Chain.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {Object} [options.logger] - Optional logger instance.
 *                                    Must comply to the [Console interface](https://developer.mozilla.org/es/docs/Web/API/Console).
 *                                    Defaults to console.
 * @param {tracker} [options.tracker] - optional tracker to use for the actual tracking. Defaults to the pixel tracker.
 * @param {string} [options.errorCode] - error code. Needed if we are tracking an error.
 */
const trackError = (vastChain, { errorCode, tracker = pixelTracker }) => {
    vastChain.forEach(({ ad, parsedXML }) => {
        const errorURI = getAdErrorURI(ad) || getVastErrorURI(parsedXML);

        if (Boolean(errorURI)) {
            tracker(errorURI, { errorCode });
        }
    });
};

export default trackError;
