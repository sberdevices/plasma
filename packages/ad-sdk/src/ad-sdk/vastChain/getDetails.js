import { get, getFirstChild, getText, getAttribute } from "../xml";
import getLinearCreative from "../vastSelectors/helpers/getLinearCreative";
import {
    isInline,
    getClickThrough,
    getCreativeData,
    isWrapper,
    getMediaFiles,
    getInteractiveFiles,
} from "../vastSelectors";
import parseTime from "../vastSelectors/helpers/parseTime";

const getAdSystem = (ad) => {
    const adTypeElement = getFirstChild(ad);
    const element = adTypeElement && get(adTypeElement, "AdSystem");

    if (element) {
        return getText(element);
    }

    return undefined;
};

const getSubElementValue = (parentElement, tagName) => {
    const element = parentElement && get(parentElement, tagName);

    if (element) {
        return getText(element);
    }

    return undefined;
};

const getPricingElement = (ad) => {
    const adTypeElement = getFirstChild(ad);

    return adTypeElement && get(adTypeElement, "Pricing");
};

const getPricing = (vastChain) => {
    const { ad } = vastChain[0];
    const pricingElement = getPricingElement(ad);

    if (pricingElement) {
        return {
            pricing: getText(pricingElement),
            pricingCurrency: getAttribute(pricingElement, "currency"),
            pricingModel: getAttribute(pricingElement, "model"),
        };
    }

    if (vastChain.length > 1) {
        return getPricing(vastChain.slice(1));
    }

    return {};
};

const getCategory = (ad) => {
    const inLineElement = get(ad, "InLine");
    const categoryElement = inLineElement && get(inLineElement, "Category");

    if (categoryElement) {
        return {
            category: getText(categoryElement),
            categoryAuthority: getAttribute(categoryElement, "authority"),
        };
    }

    return {};
};

const getVastVersion = (parsedVast) => {
    const vastElement = parsedVast && get(parsedVast, "VAST");

    if (vastElement) {
        return getAttribute(vastElement, "version");
    }

    return "unknown";
};

/**
 * @function getDetails
 *
 * @memberof module:video-ad-sdk
 * @static
 * @description Returns a summary of the passed {@link VastChain}.
 *
 * @param {VastChain} vastChain - the {@link VastChain} from which we want the details.
 *
 * @returns {VastChainDetails} - Returns a {@link VastChainDetails} object from the passed {@link VastChain}.
 */
const getDetails = (vastChain) => {
    const adIds = vastChain.map(({ ad }) => getAttribute(ad, "id"));
    const adSystems = vastChain.map(({ ad }) => getAdSystem(ad));
    const creatives = vastChain.map(({ ad }) => getLinearCreative(ad)).filter((creative) => Boolean(creative));
    const creativeIds = creatives.map((creative) => getAttribute(creative, "id"));
    const creativeAdIds = creatives.map((creative) => getAttribute(creative, "adId"));
    const { pricing, pricingCurrency, pricingModel } = getPricing(vastChain);
    const { category, categoryAuthority } = getCategory(vastChain[0].ad);
    const adTypeElement = getFirstChild(vastChain[0].ad);
    const creativeElement = getLinearCreative(vastChain[0].ad);
    const linearElement = creativeElement && get(creativeElement, "Linear");
    const adServingId = getSubElementValue(adTypeElement, "AdServingId");
    const vastVersion = getVastVersion(vastChain[0].parsedXML);
    const advertiser = getSubElementValue(adTypeElement, "Advertiser");
    const adTitle = getSubElementValue(adTypeElement, "AdTitle");
    const description = getSubElementValue(adTypeElement, "Description");
    const duration = getSubElementValue(linearElement, "Duration");
    const durationInMs = duration && parseTime(duration);
    let adId;
    let adWrapperIds = [];
    let adSystem;
    let adWrapperSystems = [];
    let creativeId;
    let adWrapperCreativeIds = [];
    let creativeAdId;
    let adWrapperCreativeAdIds = [];
    let clickThroughUrl;
    let creativeData;
    let universalAdId;
    let universalAdIdRegistry;
    let mediaFiles = [];
    let vpaid;
    let skippable;
    let skipOffset;
    let skipOffsetInMs;

    if (isInline(vastChain[0].ad)) {
        [adId, ...adWrapperIds] = adIds;

        [adSystem, ...adWrapperSystems] = adSystems;

        [creativeId, ...adWrapperCreativeIds] = creativeIds;

        [creativeAdId, ...adWrapperCreativeAdIds] = creativeAdIds;

        clickThroughUrl = getClickThrough(vastChain[0].ad);
        creativeData = getCreativeData(vastChain[0].XML);
        const universalIdElement = get(creativeElement, "UniversalAdId");

        universalAdId = getText(universalIdElement);
        universalAdIdRegistry = getAttribute(universalIdElement, "idRegistry");
        mediaFiles = getMediaFiles(vastChain[0].ad);
        vpaid = Boolean(getInteractiveFiles(vastChain[0].ad));
        skipOffset = getAttribute(linearElement, "skipoffset");
        skipOffsetInMs = parseTime(skipOffset);
        skippable = Boolean(skipOffset);
    } else if (isWrapper(vastChain[0].ad)) {
        adWrapperIds = adIds;
        adWrapperSystems = adSystems;
        adWrapperCreativeIds = creativeIds;
        adWrapperCreativeAdIds = creativeAdIds;
    }

    return {
        adId,
        adServingId,
        adSystem,
        adTitle,
        advertiser,
        adWrapperCreativeAdIds,
        adWrapperCreativeIds,
        adWrapperIds,
        adWrapperSystems,
        category,
        categoryAuthority,
        clickThroughUrl,
        creativeAdId,
        creativeData,
        creativeId,
        description,
        duration,
        durationInMs,
        mediaFiles,
        pricing,
        pricingCurrency,
        pricingModel,
        skipOffset,
        skipOffsetInMs,
        skippable,
        universalAdId,
        universalAdIdRegistry,
        vastVersion,
        vpaid,
    };
};

export default getDetails;
