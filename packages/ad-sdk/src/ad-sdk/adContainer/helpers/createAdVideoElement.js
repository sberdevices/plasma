const createAdVideoElement = ({ contentDocument = document, muted = false }) => {
    const video = contentDocument.createElement("VIDEO");

    video.style.width = "100%";
    video.style.height = "100%";
    video.muted = muted;

    return video;
};

export default createAdVideoElement;
