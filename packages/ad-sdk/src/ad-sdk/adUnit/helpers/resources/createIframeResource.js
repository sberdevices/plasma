const createIframeResource = (src, { document, data }) => {
    const { height, width } = data;
    const iframeElement = document.createElement("IFRAME");

    iframeElement.src = src;
    iframeElement.sandbox = "allow-forms allow-popups allow-scripts";
    iframeElement.loading = "eager";

    if (width) {
        iframeElement.width = width;
    }

    if (height) {
        iframeElement.height = height;
    }

    iframeElement.src = src;

    iframeElement.frameBorder = 0;
    iframeElement.style.border = "none";

    return iframeElement;
};

export default createIframeResource;
