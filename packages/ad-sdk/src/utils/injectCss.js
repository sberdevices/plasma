export function injectCss(css) {
    const head = document.getElementsByTagName("head")[0];
    const styleBlock = document.createElement("style");
    styleBlock.setAttribute("type", "text/css");
    styleBlock.appendChild(document.createTextNode(css));
    head.appendChild(styleBlock);
}
