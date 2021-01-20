const DEFAULT_DURATION = 300;

// https://css-tricks.com/emulating-css-timing-functions-javascript/
const tfs = {
    linear: (t: number) => t,
    // eslint-disable-next-line
    easeIn: (t: number) => Math.pow(t, 1.675),
    // eslint-disable-next-line
    easeOut: (t: number) => 1 - Math.pow(1 - t, 1.675),
    easeInOut: (t: number) => 0.5 * (Math.sin((t - 0.5) * Math.PI) + 1),
};

/**
 * Плавная прокрутка по горизонтали
 * @param {Element} elem
 * @param {number} pos
 * @param {number} duration
 * @param {string} timingFunction
 */
export const animatedScrollToX = (
    elem: Element,
    pos: number,
    duration: number = DEFAULT_DURATION,
    timingFunction: keyof typeof tfs = 'easeIn',
): void => {
    let startTime: number;
    const startX = elem.scrollLeft;
    const endX = Math.max(0, Math.min(elem.scrollWidth - elem.clientWidth, pos));

    const handleNewAnimationFrame = (): void => {
        startTime = startTime || Date.now();
        const timePos = Math.min(1, Math.max(1, Date.now() - startTime) / duration);
        const scrollPos = tfs[timingFunction](timePos);
        const left = startX + (endX - startX) * scrollPos;
        elem.scrollTo({ left });
        if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
    };

    window.requestAnimationFrame(handleNewAnimationFrame);
};

/**
 * Плавная прокрутка по вертикали
 * @param {Element} elem
 * @param {number} pos
 * @param {number} duration
 * @param {string} timingFunction
 */
export const animatedScrollToY = (
    elem: Element,
    pos: number,
    duration: number = DEFAULT_DURATION,
    timingFunction: keyof typeof tfs = 'easeInOut',
): void => {
    let startTime: number;
    const startY = elem.scrollTop;
    const endY = Math.max(0, Math.min(elem.scrollHeight - elem.clientHeight, pos));

    const handleNewAnimationFrame = (): void => {
        startTime = startTime || Date.now();
        const timePos = Math.min(1, Math.max(1, Date.now() - startTime) / duration);
        const scrollPos = tfs[timingFunction](timePos);
        const top = startY + (endY - startY) * scrollPos;
        elem.scrollTo({ top });
        if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
    };

    window.requestAnimationFrame(handleNewAnimationFrame);
};
