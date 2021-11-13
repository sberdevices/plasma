import {
    getClickTracking,
    getCustomClick,
    getImpression,
    getViewable,
    getNotViewable,
    getViewUndetermined,
    getLinearTrackingEvents,
} from "../vastSelectors";
import pixelTracker from "./helpers/pixelTracker";
import trackError from "./helpers/trackError";
import trackIconView from "./helpers/trackIconView";
import trackIconClick from "./helpers/trackIconClick";
import trackProgress from "./helpers/trackProgress";
import createVastEventTracker from "./helpers/createVastEventTracker";
import {
    clickThrough,
    closeLinear,
    complete,
    error,
    exitFullscreen,
    firstQuartile,
    fullscreen,
    iconClick,
    iconView,
    impression,
    viewable,
    notViewable,
    viewUndetermined,
    midpoint,
    mute,
    pause,
    playerCollapse,
    playerExpand,
    progress,
    resume,
    rewind,
    skip,
    start,
    thirdQuartile,
    unmute,
    creativeView,
} from "./linearEvents";

const eventSelector = (...selectors) => (ad) => {
    const trackingURIs = [];

    if (selectors.length > 0) {
        selectors.forEach((getElements) => {
            const elements = getElements(ad);

            /* istanbul ignore else */
            if (Array.isArray(elements) && elements.length > 0) {
                trackingURIs.push(...elements.map((uri) => ({ uri })));
            }
        });
    }

    return trackingURIs;
};

const linearTrackingEventSelector = (event) => (ad) => getLinearTrackingEvents(ad, event);

const linearTrackers = {
    [clickThrough]: createVastEventTracker(eventSelector(getClickTracking, getCustomClick)),
    [closeLinear]: createVastEventTracker(linearTrackingEventSelector(closeLinear)),
    [complete]: createVastEventTracker(linearTrackingEventSelector(complete)),
    [creativeView]: createVastEventTracker(linearTrackingEventSelector(creativeView)),
    [error]: trackError,
    [exitFullscreen]: createVastEventTracker(linearTrackingEventSelector(exitFullscreen)),
    [firstQuartile]: createVastEventTracker(linearTrackingEventSelector(firstQuartile)),
    [fullscreen]: createVastEventTracker(linearTrackingEventSelector(fullscreen)),
    [iconClick]: trackIconClick,
    [iconView]: trackIconView,
    [impression]: createVastEventTracker(eventSelector(getImpression)),
    [midpoint]: createVastEventTracker(linearTrackingEventSelector(midpoint)),
    [mute]: createVastEventTracker(linearTrackingEventSelector(mute)),
    [notViewable]: createVastEventTracker(eventSelector(getNotViewable)),
    [pause]: createVastEventTracker(linearTrackingEventSelector(pause)),
    [playerCollapse]: createVastEventTracker(linearTrackingEventSelector(playerCollapse)),
    [playerExpand]: createVastEventTracker(linearTrackingEventSelector(playerExpand)),
    [progress]: trackProgress,
    [resume]: createVastEventTracker(linearTrackingEventSelector(resume)),
    [rewind]: createVastEventTracker(linearTrackingEventSelector(rewind)),
    [skip]: createVastEventTracker(linearTrackingEventSelector(skip)),
    [start]: createVastEventTracker(linearTrackingEventSelector(start)),
    [thirdQuartile]: createVastEventTracker(linearTrackingEventSelector(thirdQuartile)),
    [unmute]: createVastEventTracker(linearTrackingEventSelector(unmute)),
    [viewable]: createVastEventTracker(eventSelector(getViewable)),
    [viewUndetermined]: createVastEventTracker(eventSelector(getViewUndetermined)),
};

/**
 * Tracks the passed linear event.
 *
 * @ignore
 * @param {string} event - name of the linear event we need to track. @see LinearEvents
 * @param {VastChain} vastChain - the ad VAST Chain.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {Object} [options.logger] - Optional logger instance.
 *                                    Must comply to the [Console interface](https://developer.mozilla.org/es/docs/Web/API/Console).
 *                                    Defaults to console.
 * @param {Object} [options.data] - additional data for the URL macro. See [VAST specification]{@link https://www.iab.com/guidelines/digital-video-ad-serving-template-vast-4-0/}
 * @param {tracker} [options.tracker] - optional tracker to use for the actual tracking. Defaults to the pixel tracker.
 * @param {string} [options.errorCode] - error code. Needed if we are tracking an error.
 */
const trackLinearEvent = (event, vastChain, { data, errorCode, tracker = pixelTracker, logger = console }) => {
    const linearTracker = linearTrackers[event];

    if (linearTracker) {
        linearTracker(vastChain, {
            data: {
                ...data,
                errorCode,
            },
            errorCode,
            tracker,
        });
    } else {
        logger.error(`Event '${event}' cannot be tracked`);
    }
};

export default trackLinearEvent;
