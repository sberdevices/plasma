import { getVASTAdTagURI, isWrapper } from "../vastSelectors";
import requestAd from "./requestAd";
import getNextAd from "./helpers/getNextAd";
import { markAdAsRequested } from "./helpers/adUtils";

const validateChain = (VastChain) => {
    if (!Array.isArray(VastChain)) {
        throw new TypeError("Invalid VAST chain");
    }

    if (VastChain.length === 0) {
        throw new Error("No next ad to request");
    }
};

// eslint-disable-next-line jsdoc/check-tag-names
/**
 * @function requestNextAd
 *
 * @memberof module:video-ad-sdk
 * @async
 * @static
 * @description Requests the next ad in the VAST Chain.
 *
 * @param {VastChain} VastChain - Array of {@link VastResponse}.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {number} [options.wrapperLimit] - Sets the maximum number of wrappers allowed in the vastChain.
 *  Defaults to `5`.
 * @param {boolean} [options.AllowMultipleAds] - Boolean to indicate whether adPods are allowed or not.
 *  Defaults to `true`.
 * @param {tracker} [options.track] - optional function to track whatever errors occur during the loading.
 *  Defaults to `video-ad-tracker` track method.
 * @param {boolean} [options.useAdBuffet] - Specifies whether to use buffet ads from an ad pod if possible.
 *    If no buffet ad is available it will return the next ad in ad pod sequence.
 *    Set it to true if an ad from an adPod failed and you want to replace it with an ad from the ad buffet.
 *    Defaults to `false`.
 * @param {boolean} [options.fallbackOnNoAd] - tells the video player to select an ad from any stand-alone ads available.
 *    Note: if the {@link VastChain} contains an adPod this property will be ignored.
 *    Defaults to `true`.
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the request will timeout if it is not fulfilled before the specified time.
 *
 * @returns {Promise.<VastChain>}  - Returns a Promise that will resolve with a VastChain with the newest VAST response at the beginning of the array.
 * If the {@link VastChain} had an error. The first VAST response of the array will contain an error and an errorCode entry.
 */
const requestNextAd = (VastChain, options) => {
    validateChain(VastChain);

    const vastResponse = VastChain[0];
    const nextAd = getNextAd(vastResponse, options);

    if (Boolean(nextAd)) {
        const newVastResponse = Object.assign({}, vastResponse, {
            ad: nextAd,
        });
        const newVastChain = [newVastResponse, ...VastChain.slice(1)];

        markAdAsRequested(nextAd);

        if (isWrapper(nextAd)) {
            return requestAd(getVASTAdTagURI(nextAd), options, newVastChain);
        }

        return Promise.resolve(newVastChain);
    }

    return requestNextAd(VastChain.slice(1), options);
};

export default requestNextAd;
