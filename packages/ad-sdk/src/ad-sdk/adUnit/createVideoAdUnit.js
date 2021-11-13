import { linearEvents, nonLinearEvents, trackLinearEvent, trackNonLinearEvent } from "../tracker";
import VastAdUnit from "./VastAdUnit";
import VpaidAdUnit from "./VpaidAdUnit";

const createVideoAdUnit = (vastChain, videoAdContainer, options) => {
    const { tracker, type } = options;
    const adUnit =
        type === "VPAID"
            ? new VpaidAdUnit(vastChain, videoAdContainer, options)
            : new VastAdUnit(vastChain, videoAdContainer, options);

    Object.values(linearEvents).forEach((linearEvent) =>
        adUnit.on(linearEvent, (event) => {
            const { type: evtType, data } = event;
            const payload = {
                data,
                errorCode: adUnit.errorCode,
                tracker,
            };

            trackLinearEvent(evtType, vastChain, payload);
        })
    );

    Object.values(nonLinearEvents).forEach((nonLinearEvent) =>
        adUnit.on(nonLinearEvent, (event) => {
            const payload = {
                data: event.data,
                tracker,
            };

            trackNonLinearEvent(event.type, vastChain, payload);
        })
    );

    return adUnit;
};

export default createVideoAdUnit;
