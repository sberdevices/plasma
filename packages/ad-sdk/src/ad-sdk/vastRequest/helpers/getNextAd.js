import { hasAdPod, getAds, getPodAdSequence, isPodAd } from "../../vastSelectors";
import { hasAdBeenRequested } from "./adUtils";

const getNextPod = (currentPod, ads) => {
    const nextPodSequence = getPodAdSequence(currentPod) + 1;

    return ads.find((ad) => getPodAdSequence(ad) === nextPodSequence) || null;
};

const getNextAd = ({ ad, parsedXML }, { fallbackOnNoAd = true, useAdBuffet = false }) => {
    const ads = getAds(parsedXML);
    const availableAds = ads.filter((adDefinition) => !hasAdBeenRequested(adDefinition));
    let nextAd = null;

    if (hasAdPod(parsedXML)) {
        if (useAdBuffet) {
            nextAd = availableAds.filter((adDefinition) => !isPodAd(adDefinition))[0];
        }

        if (!nextAd) {
            nextAd = getNextPod(ad, availableAds);
        }
    } else if (availableAds.length > 0 && fallbackOnNoAd) {
        nextAd = availableAds[0];
    }

    return nextAd;
};

export default getNextAd;
