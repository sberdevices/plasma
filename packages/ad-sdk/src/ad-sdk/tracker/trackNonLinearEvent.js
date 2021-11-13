import { getNonLinearTrackingEvents } from "../vastSelectors";
import createVastEventTracker from "./helpers/createVastEventTracker";
import pixelTracker from "./helpers/pixelTracker";
import { acceptInvitation, adCollapse, close } from "./nonLinearEvents";

const trackingEventSelector = (event) => (ad) => getNonLinearTrackingEvents(ad, event);
const linearTrackers = {
    [acceptInvitation]: createVastEventTracker(trackingEventSelector(acceptInvitation)),
    [adCollapse]: createVastEventTracker(trackingEventSelector(adCollapse)),
    [close]: createVastEventTracker(trackingEventSelector(close)),
};

/**
 * Tracks the passed non linear event.
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
 */
const trackNonLinearEvent = (event, vastChain, { data, tracker = pixelTracker, logger = console }) => {
    const linearTracker = linearTrackers[event];

    if (linearTracker) {
        linearTracker(vastChain, {
            data: {
                ...data,
            },
            tracker,
        });
    } else {
        logger.error(`Event '${event}' cannot be tracked`);
    }
};

export default trackNonLinearEvent;
