import { getLinearTrackingEvents } from "../../../vastSelectors";
import { linearEvents } from "../../../tracker";

const { progress } = linearEvents;

const getProgressEvents = (vastChain) =>
    vastChain
        .map(({ ad }) => ad)
        .reduce((accumulated, ad) => {
            const events = getLinearTrackingEvents(ad, progress) || [];

            return [...accumulated, ...events];
        }, [])
        .map(({ offset, uri }) => ({
            offset,
            uri,
        }));

export default getProgressEvents;
