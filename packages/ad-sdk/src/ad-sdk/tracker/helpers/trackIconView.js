import pixelTracker from "./pixelTracker";

const trackIconView = (vastChain, { data, tracker = pixelTracker }) => {
    const { iconViewTracking } = data;

    if (Array.isArray(iconViewTracking)) {
        for (const trackUrl of iconViewTracking) {
            tracker(trackUrl, { ...data });
        }
    }
};

export default trackIconView;
