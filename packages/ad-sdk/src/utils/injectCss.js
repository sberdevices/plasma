export function injectCss(id, css) {
    const head = document.getElementsByTagName("head")[0];
    const styleBlock = document.createElement("style");
    styleBlock.setAttribute("type", "text/css");
    styleBlock.id = id;
    styleBlock.appendChild(document.createTextNode(css));
    head.appendChild(styleBlock);
}

export function removeCss(id) {
    const styleElement = document.getElementById(id);
    if (styleElement) {
        styleElement.parentNode.removeChild(styleElement);
    }
}
