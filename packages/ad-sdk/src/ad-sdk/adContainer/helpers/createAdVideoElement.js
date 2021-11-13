const createAdVideoElement = (contentDocument = document) => {
    const video = contentDocument.createElement("VIDEO");

    video.style.width = "100%";
    video.style.height = "100%";

    return video;
};

export default createAdVideoElement;
