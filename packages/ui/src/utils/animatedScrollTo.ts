/**
 * Плавная прокрутка
 * @param {Element} elem
 * @param {number} pos
 */
export const animatedScrollToX = (elem: Element, pos: number): void => {
    const startTime = Date.now();
    const duration = 500;
    const startX = elem.scrollLeft;
    const endX = Math.max(0, Math.min(elem.scrollWidth - elem.clientWidth, pos));

    const handleNewAnimationFrame = (): void => {
        const timePos = Math.min(1, (Date.now() - startTime) / duration);
        // eslint-disable-next-line
        const scrollPos = 1 - Math.pow(1 - timePos, 3); // easing
        const left = startX + (endX - startX) * scrollPos;
        elem.scrollTo({ left });
        if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
    };

    window.requestAnimationFrame(handleNewAnimationFrame);
};
/**
 * Плавная прокрутка
 * @param {Element} elem
 * @param {number} pos
 */
export const animatedScrollToY = (elem: Element, pos: number): void => {
    const startTime = Date.now();
    const duration = 500;
    const startY = elem.scrollTop;
    const endY = Math.max(0, Math.min(elem.scrollHeight - elem.clientHeight, pos));

    const handleNewAnimationFrame = (): void => {
        const timePos = Math.min(1, (Date.now() - startTime) / duration);
        // eslint-disable-next-line
        const scrollPos = 1 - Math.pow(1 - timePos, 3); // easing
        const top = startY + (endY - startY) * scrollPos;
        elem.scrollTo({ top });
        if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
    };

    window.requestAnimationFrame(handleNewAnimationFrame);
};
