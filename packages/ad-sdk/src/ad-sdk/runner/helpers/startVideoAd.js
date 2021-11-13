import createVideoAdUnit from "../../adUnit/createVideoAdUnit";
import VideoAdContainer from "../../adContainer/VideoAdContainer";
import { getInteractiveFiles, getMediaFiles } from "../../vastSelectors";
import canPlay from "../../adUnit/helpers/media/canPlay";
import { start, closeLinear } from "../../tracker/linearEvents";
import { adStopped, adUserClose } from "../../adUnit/helpers/vpaid/api";

const validate = (vastChain, videoAdContainer) => {
    if (!Array.isArray(vastChain) || vastChain.length === 0) {
        throw new TypeError("Invalid vastChain");
    }

    if (!(videoAdContainer instanceof VideoAdContainer)) {
        throw new TypeError("Invalid VideoAdContainer");
    }
};

const hasVpaidCreative = (ad) => Boolean(getInteractiveFiles(ad));

const hasVastCreative = (ad, videoElement) => {
    const mediaFiles = getMediaFiles(ad);

    if (mediaFiles) {
        return mediaFiles.some((mediaFile) => canPlay(videoElement, mediaFile));
    }

    return false;
};

const startAdUnit = (adUnit, { onAdReady }) =>
    new Promise((resolve, reject) => {
        const createRejectHandler = (event) => () =>
            reject(new Error(`Ad unit start rejected due to event '${event}'`));

        adUnit.onError(reject);
        adUnit.on(start, () => resolve(adUnit));
        adUnit.on(adUserClose, createRejectHandler(adUserClose));
        adUnit.on(closeLinear, createRejectHandler(closeLinear));
        adUnit.on(adStopped, createRejectHandler(adStopped));

        onAdReady(adUnit);
        adUnit.start();
    });

const tryToStartVpaidAd = (vastChain, videoAdContainer, options) => {
    if (!hasVpaidCreative(vastChain[0].ad)) {
        throw new Error("No valid creative found in the passed VAST chain");
    }

    const adUnit = createVideoAdUnit(vastChain, videoAdContainer, {
        ...options,
        type: "VPAID",
    });

    return startAdUnit(adUnit, options);
};

const startVastAd = (vastChain, videoAdContainer, options) => {
    const adUnit = createVideoAdUnit(vastChain, videoAdContainer, {
        ...options,
        type: "VAST",
    });

    return startAdUnit(adUnit, options);
};

const startVideoAd = async (vastChain, videoAdContainer, options) => {
    validate(vastChain, videoAdContainer);
    try {
        return await tryToStartVpaidAd(vastChain, videoAdContainer, options);
    } catch (error) {
        if (hasVastCreative(vastChain[0].ad, videoAdContainer.videoElement)) {
            return startVastAd(vastChain, videoAdContainer, options);
        }

        throw error;
    }
};

export default startVideoAd;
