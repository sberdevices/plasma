import pixelTracker from "./pixelTracker";

const trackIconClick = (vastChain, { data, tracker = pixelTracker }) => {
    const { iconClickTracking } = data;

    if (Array.isArray(iconClickTracking)) {
        for (const trackUrl of iconClickTracking) {
            tracker(trackUrl, { ...data });
        }
    }
};

export default trackIconClick;
