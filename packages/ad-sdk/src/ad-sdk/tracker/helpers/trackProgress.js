import pixelTracker from "./pixelTracker";

const trackProgress = (vastChain, { data, tracker = pixelTracker }) => {
    const { progressUri } = data;

    if (Boolean(progressUri)) {
        tracker(progressUri, { ...data });
    }
};

export default trackProgress;
