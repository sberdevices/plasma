const getContentDocument = (iframeElement) =>
    iframeElement.contentDocument ||
    /* istanbul ignore next */
    (iframeElement.contentWindow && iframeElement.contentWindow.document);

export default getContentDocument;
