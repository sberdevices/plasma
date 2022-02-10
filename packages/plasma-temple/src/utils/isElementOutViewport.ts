export const isElementOutViewport = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
};
