/* eslint-disable promise/prefer-await-to-callbacks */
import { getClickThrough, getSkipOffset } from "../../../vastSelectors";
import getProgressEvents from "../progress/getProgressEvents";
import safeCallback from "../safeCallback";
import metricHandlers from "./handlers";

const setupMetricHandlers = ({ vastChain, videoAdContainer, hooks }, callback) => {
    const inlineAd = vastChain[0].ad;
    const skipoffset = getSkipOffset(inlineAd);
    const clickThroughUrl = getClickThrough(inlineAd);
    const progressEvents = getProgressEvents(vastChain);
    const data = {
        clickThroughUrl,
        progressEvents,
        skipoffset,
        ...hooks,
    };

    const stopHandlersFns = metricHandlers.map((handler) => safeCallback(handler(videoAdContainer, callback, data)));

    return () => stopHandlersFns.forEach((disconnect) => disconnect());
};

export default setupMetricHandlers;
