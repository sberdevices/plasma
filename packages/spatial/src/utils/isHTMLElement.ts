function isHTMLElement(param: unknown): param is HTMLElement {
    return param instanceof HTMLElement && param.nodeType === Node.ELEMENT_NODE && param !== document.body;
}
export { isHTMLElement };

export default isHTMLElement;
