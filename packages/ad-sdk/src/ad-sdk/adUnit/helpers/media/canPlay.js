import guessMimeType from "./guessMimeType";

const canPlay = (videoElement, mediaFile) => {
    const { src, type } = mediaFile;

    return videoElement.canPlayType(type || guessMimeType(src));
};

export default canPlay;
