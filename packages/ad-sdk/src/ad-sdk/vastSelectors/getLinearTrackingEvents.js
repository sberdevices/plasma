import { get, getAll, getText, getAttributes } from "../xml";
import parseOffset from "./helpers/parseOffset";
import getLinearCreative from "./helpers/getLinearCreative";

const getLinearTrackingEvents = (ad, eventName) => {
    const creativeElement = ad && getLinearCreative(ad);

    if (creativeElement) {
        const linearElement = get(creativeElement, "Linear");
        const trackingEventsElement = linearElement && get(linearElement, "TrackingEvents");
        const trackingEventElements = trackingEventsElement && getAll(trackingEventsElement, "Tracking");

        if (trackingEventElements && trackingEventElements.length > 0) {
            const trackingEvents = trackingEventElements.map((trackingEventElement) => {
                const { event, offset } = getAttributes(trackingEventElement);
                const uri = getText(trackingEventElement);

                return {
                    event,
                    offset: offset && parseOffset(offset),
                    uri,
                };
            });

            if (eventName) {
                const filteredEvents = trackingEvents.filter(({ event }) => event === eventName);

                if (filteredEvents.length > 0) {
                    return filteredEvents;
                }
            } else {
                return trackingEvents;
            }
        }
    }

    return null;
};

export default getLinearTrackingEvents;
