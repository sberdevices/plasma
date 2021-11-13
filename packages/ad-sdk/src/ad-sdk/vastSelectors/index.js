/**
 * @memberof module:video-ad-sdk
 * @description Published as part of {@link module:video-ad-sdk}
 * @module vastSelectors
 */
import { get, getAll, getFirstChild, getText, getAttributes, getAttribute } from "../xml";
import parseOffset from "./helpers/parseOffset";
import getLinearCreative from "./helpers/getLinearCreative";
import getLinearTrackingEvents from "./getLinearTrackingEvents";
import getNonLinearTrackingEvents from "./getNonLinearTrackingEvents";
import getIcons from "./getIcons";

const getBooleanValue = (val) => {
    if (typeof val === "string") {
        return val === "true";
    }

    return Boolean(val);
};

const compareBySequence = (itemA, itemB) => {
    const itemASequence = parseInt(getAttribute(itemA, "sequence"), 10);
    const itemBSequence = parseInt(getAttribute(itemB, "sequence"), 10);

    if (itemASequence < itemBSequence) {
        return -1;
    }

    if (itemASequence > itemBSequence) {
        return 1;
    }

    return 0;
};

/**
 * Selects the ads of the passed VAST.
 *
 * @function
 * @param {ParsedVast} parsedVAST - Parsed VAST xml.
 * @returns {?Array} - Array of ads or empty array.
 * @static
 */
export const getAds = (parsedVAST) => {
    const vastElement = parsedVAST && get(parsedVAST, "VAST");
    const ads = vastElement && getAll(vastElement, "Ad");

    if (ads && ads.length > 0) {
        return ads;
    }

    return [];
};

/**
 * Gets the Error URI of the passed parsed VAST xml.
 *
 * @function
 * @param {ParsedVast} parsedVAST - Parsed VAST xml.
 * @returns {?VAST-macro} - Vast Error URI or `null` otherwise.
 * @static
 */
export const getVastErrorURI = (parsedVAST) => {
    const vastElement = parsedVAST && get(parsedVAST, "VAST");

    if (vastElement) {
        const error = get(vastElement, "Error");

        if (error) {
            return getText(error);
        }
    }

    return null;
};

/**
 * Gets the sequence of the pod ad.
 *
 * @function
 * @param {ParsedAd} ad - Parsed ad definition object.
 * @returns {?number} - The pod ad sequence number or `null`.
 * @static
 */
export const getPodAdSequence = (ad) => {
    const sequence = parseInt(getAttribute(ad, "sequence"), 10);

    if (typeof sequence === "number" && !isNaN(sequence)) {
        return sequence;
    }

    return null;
};

/**
 * Checks if the passed ad definition is a pod ad.
 *
 * @function
 * @param {ParsedAd} ad - Parsed ad definition object.
 * @returns {?boolean} - Returns true if there the ad is a pod ad and false otherwise.
 * @static
 */
export const isPodAd = (ad) => Boolean(getPodAdSequence(ad));

/**
 * Checks if the passed array of ads have an ad pod.
 *
 * @function
 * @param {ParsedVAST} parsedVAST - Parsed VAST xml.
 * @returns {?boolean} - Returns true if there is an ad pod in the array and false otherwise.
 * @static
 */
export const hasAdPod = (parsedVAST) => {
    const ads = getAds(parsedVAST);

    return Array.isArray(ads) && ads.filter(isPodAd).length > 1;
};

/**
 * Returns true if the passed VastChain has an ad pod or false otherwise.
 *
 * @function
 * @param {Array} VastChain - Array of VAST responses. See `load` or `requestAd` for more info.
 *
 * @returns {boolean} - True if the VastChain contains an ad pod and false otherwise.
 * @static
 */
export const isAdPod = (VastChain = []) => VastChain.map(({ parsedXML }) => parsedXML).some(hasAdPod);

/**
 * Selects the first ad of the passed VAST. If the passed VAST response contains an ad pod it will return the first ad in the ad pod sequence.
 *
 * @function
 * @param {ParsedVAST} parsedVAST - Parsed VAST xml.
 * @returns {?ParsedAd} - First ad of the VAST xml or `null`.
 * @static
 */
export const getFirstAd = (parsedVAST) => {
    const ads = getAds(parsedVAST);

    if (Array.isArray(ads) && ads.length > 0) {
        if (hasAdPod(parsedVAST)) {
            return ads.filter(isPodAd).sort(compareBySequence)[0];
        }

        return ads[0];
    }

    return null;
};

/**
 * Checks if the passed ad is a Wrapper.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {boolean} - `true` if the ad contains a wrapper and `false` otherwise.
 * @static
 */
export const isWrapper = (ad = {}) => Boolean(get(ad || {}, "Wrapper"));

/**
 * Checks if the passed ad is an Inline.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {boolean} - Returns `true` if the ad contains an Inline or `false` otherwise.
 * @static
 */
export const isInline = (ad) => Boolean(get(ad || {}, "Inline"));

/**
 * Returns the VASTAdTagURI from the wrapper ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?string} - Returns the VASTAdTagURI from the wrapper ad or `null` otherwise.
 * @static
 */
export const getVASTAdTagURI = (ad) => {
    const wrapperElement = get(ad, "Wrapper");
    const vastAdTagURIElement = wrapperElement && get(wrapperElement, "VastAdTagUri");

    if (vastAdTagURIElement) {
        return getText(vastAdTagURIElement) || null;
    }

    return null;
};

/**
 * Returns the options from the wrapper ad.
 *
 * @function
 * @param {Object} ad - VAST ad object.
 * @returns {WrapperOptions} - Returns the options from the wrapper ad.
 * @static
 */
export const getWrapperOptions = (ad) => {
    const { allowMultipleAds, fallbackOnNoAd, followAdditionalWrappers } = getAttributes(get(ad, "Wrapper"));

    const opts = {};

    if (allowMultipleAds) {
        opts.allowMultipleAds = getBooleanValue(allowMultipleAds);
    }

    if (fallbackOnNoAd) {
        opts.fallbackOnNoAd = getBooleanValue(fallbackOnNoAd);
    }

    if (followAdditionalWrappers) {
        opts.followAdditionalWrappers = getBooleanValue(followAdditionalWrappers);
    }

    return opts;
};

/**
 * Gets the Error URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?string} - Vast ad Error URI or `null` otherwise.
 * @static
 */
export const getAdErrorURI = (ad) => {
    const adTypeElement = ad && getFirstChild(ad);

    if (adTypeElement) {
        const error = get(adTypeElement, "Error");

        if (error) {
            return getText(error);
        }
    }

    return null;
};

/**
 * Gets array of the Impression URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<string>} - array of the Vast ad Impression URI or `null` otherwise.
 * @static
 */
export const getImpression = (ad) => {
    const adTypeElement = ad && getFirstChild(ad);
    const impressions = adTypeElement && getAll(adTypeElement, "Impression");

    if (impressions && impressions.length > 0) {
        return impressions.map((impression) => getText(impression));
    }

    return null;
};

/**
 * Gets array of the Viewable URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<string>} - array of the Vast ad Viewable URI or `null` otherwise.
 * @static
 */
export const getViewable = (ad) => {
    const adTypeElement = ad && getFirstChild(ad);
    const viewableImpression = adTypeElement && get(adTypeElement, "ViewableImpression");
    const viewableElements = viewableImpression && getAll(viewableImpression, "Viewable");

    if (viewableElements && viewableElements.length > 0) {
        return viewableElements.map((element) => getText(element));
    }

    return null;
};

/**
 * Gets array of the NotViewable URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<string>} - array of the Vast ad NotViewable URI or `null` otherwise.
 * @static
 */
export const getNotViewable = (ad) => {
    const adTypeElement = ad && getFirstChild(ad);
    const viewableImpression = adTypeElement && get(adTypeElement, "ViewableImpression");
    const notViewableElements = viewableImpression && getAll(viewableImpression, "NotViewable");

    if (notViewableElements && notViewableElements.length > 0) {
        return notViewableElements.map((element) => getText(element));
    }

    return null;
};

/**
 * Gets array of the ViewUndetermined URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<string>} - array of the Vast ad ViewUndetermined URI or `null` otherwise.
 * @static
 */
export const getViewUndetermined = (ad) => {
    const adTypeElement = ad && getFirstChild(ad);
    const viewableImpression = adTypeElement && get(adTypeElement, "ViewableImpression");
    const viewUndeterminedElements = viewableImpression && getAll(viewableImpression, "ViewUndetermined");

    if (viewUndeterminedElements && viewUndeterminedElements.length > 0) {
        return viewUndeterminedElements.map((element) => getText(element));
    }

    return null;
};

/**
 * Gets the ad's MediaFiles.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<MediaFile>} - array of media files or null
 * @static
 */
export const getMediaFiles = (ad) => {
    const creativeElement = ad && getLinearCreative(ad);

    if (creativeElement) {
        const universalAdIdElement = get(creativeElement, "UniversalAdId");
        const universalAdId = (universalAdIdElement && getText(universalAdIdElement)) || null;
        const linearElement = get(creativeElement, "Linear");
        const mediaFilesElement = get(linearElement, "MediaFiles");
        const mediaFileElements = mediaFilesElement && getAll(mediaFilesElement, "MediaFile");

        if (mediaFileElements && mediaFileElements.length > 0) {
            return mediaFileElements.map((mediaFileElement) => {
                const src = getText(mediaFileElement);
                const {
                    apiFramework,
                    bitrate,
                    codec,
                    delivery,
                    height,
                    id,
                    maintainAspectRatio,
                    maxBitrate,
                    minBitrate,
                    scalable,
                    type,
                    width,
                } = getAttributes(mediaFileElement);

                return {
                    apiFramework,
                    bitrate,
                    codec,
                    delivery,
                    height,
                    id,
                    maintainAspectRatio,
                    maxBitrate,
                    minBitrate,
                    scalable,
                    src,
                    type,
                    universalAdId,
                    width,
                };
            });
        }
    }

    return null;
};

/**
 * Gets the ad's InteractiveFiles. That were added with the `InteractiveCreativeFile` tag.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<InteractiveFile>} - array of media files or null
 * @static
 */
export const getInteractiveCreativeFiles = (ad) => {
    const creativeElement = ad && getLinearCreative(ad);

    if (creativeElement) {
        const linearElement = get(creativeElement, "Linear");
        const mediaFilesElement = get(linearElement, "MediaFiles");
        const interactiveElements = mediaFilesElement && getAll(mediaFilesElement, "InteractiveCreativeFile");

        if (interactiveElements && interactiveElements.length > 0) {
            return interactiveElements.map((interactiveElement) => {
                const { apiFramework, type } = getAttributes(interactiveElement);
                const src = getText(interactiveElement);

                return {
                    apiFramework,
                    src,
                    type,
                };
            });
        }
    }

    return null;
};

/**
 * Gets all the ad's InteractiveFiles.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<InteractiveFile>} - array of media files or null
 * @static
 */
export const getInteractiveFiles = (ad) => {
    let interactiveFiles = getInteractiveCreativeFiles(ad);

    if (interactiveFiles) {
        return interactiveFiles;
    }

    const mediaFiles = getMediaFiles(ad);

    if (mediaFiles) {
        interactiveFiles = mediaFiles
            .filter(({ apiFramework = "" }) => apiFramework.toLowerCase() === "vpaid")
            .map(({ apiFramework, src, type }) => ({
                apiFramework,
                src,
                type,
            }));

        if (interactiveFiles.length > 0) {
            return interactiveFiles;
        }
    }

    return null;
};

const getVideoClicksElement = (ad) => {
    const creativeElement = ad && getLinearCreative(ad);
    const linearElement = creativeElement && get(creativeElement, "Linear");
    const videoClicksElement = linearElement && get(linearElement, "VideoClicks");

    if (videoClicksElement) {
        return videoClicksElement;
    }

    return null;
};

/**
 * Gets the click through {@link VAST-macro}.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?VAST-macro} - clickthrough macro
 * @static
 */
export const getClickThrough = (ad) => {
    const videoClicksElement = getVideoClicksElement(ad);
    const clickThroughElement = videoClicksElement && get(videoClicksElement, "ClickThrough");

    if (clickThroughElement) {
        return getText(clickThroughElement);
    }

    return null;
};

/**
 * Gets the click through {@link VAST-macro}.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<VAST-macro>} - click tracking macro
 * @static
 */
export const getClickTracking = (ad) => {
    const videoClicksElement = getVideoClicksElement(ad);
    const clickTrackingElements = videoClicksElement && getAll(videoClicksElement, "ClickTracking");

    if (clickTrackingElements && clickTrackingElements.length > 0) {
        return clickTrackingElements.map((element) => getText(element));
    }

    return null;
};

/**
 * Gets the custom click {@link VAST-macro}.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<VAST-macro>} - click tracking macro
 * @static
 */
export const getCustomClick = (ad) => {
    const videoClicksElement = getVideoClicksElement(ad);
    const customClickElements = videoClicksElement && getAll(videoClicksElement, "CustomClick");

    if (customClickElements && customClickElements.length > 0) {
        return customClickElements.map((element) => getText(element));
    }

    return null;
};

/**
 * Gets the skipoffset.
 *
 * @function
 * @param {Object} ad - VAST ad object.
 * @returns {?ParsedOffset} - the time offset in milliseconds or a string with the percentage or null
 * @static
 */
export const getSkipOffset = (ad) => {
    const creativeElement = ad && getLinearCreative(ad);
    const linearElement = creativeElement && get(creativeElement, "Linear");
    const skipoffset = linearElement && getAttribute(linearElement, "skipoffset");

    if (skipoffset) {
        return parseOffset(skipoffset);
    }

    return null;
};

const getLinearContent = (xml) => {
    const linearRegex = /<Linear([\s\S]*)<\/Linear/gm;
    const result = linearRegex.exec(xml);

    return result && result[1];
};

const getAdParametersContent = (xml) => {
    const paramsRegex = /<AdParameters[\s\w="]*>([\s\S]*)<\/AdParameters>/gm;
    const result = paramsRegex.exec(xml);

    return (
        result &&
        result[1]
            .replace(/[\n\s]*<!\[CDATA\[[\n\s]*/, "")
            .replace(/[\n\s]*\]\]>[\n\s]*$/, "")

            // unescape nested CDATA
            .replace(/\]\]\]\]><!\[CDATA\[>/, "]]>")
            .trim()
    );
};

const getXmlEncodedValue = (xml) => {
    const xmlEncodedRegex = /<AdParameters[\s]*xmlEncoded="(.*?)">/gim;
    const result = xmlEncodedRegex.exec(xml);

    return Boolean(result) && result[1] === "true";
};

/**
 * Gets the creative data.
 *
 * @function
 * @param {string} xml - VAST XML text.
 * @returns {Object} - with `AdParameters` as they come in the XML and a flag `xmlEncoded` to indicate if the ad parameters are xml encoded.
 * @static
 */
export const getCreativeData = (xml) => {
    const linearContent = getLinearContent(xml);
    const AdParameters = linearContent && getAdParametersContent(linearContent);
    const xmlEncoded = linearContent && getXmlEncodedValue(linearContent);

    return {
        AdParameters,
        xmlEncoded,
    };
};

export {
    /**
     * Gets the Vast Icon definitions from the Vast Ad.
     *
     * @function
     * @param {ParsedAd} ad - VAST ad object.
     * @returns {?Array.<VastIcon>} - Array of VAST icon definitions
     * @static
     */
    getIcons,
    /**
     * Gets the Linear tracking events from the Vast Ad
     *
     * @function
     * @param {ParsedAd} ad - VAST ad object.
     * @param {string} [eventName] - If provided it will filter-out the array events against it.
     * @returns {?Array.<VastTrackingEvent>} - Array of Tracking event definitions
     * @static
     */
    getLinearTrackingEvents,
    /**
     * Gets the Non Linear tracking events from the Vast Ad
     *
     * @function
     * @param {ParsedAd} ad - VAST ad object.
     * @param {string} [eventName] - If provided it will filter-out the array events against it.
     * @returns {?Array.<VastTrackingEvent>} - Array of Tracking event definitions
     * @static
     */
    getNonLinearTrackingEvents,
};
