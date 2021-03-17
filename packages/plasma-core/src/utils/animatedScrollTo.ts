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
 * @param {number} prevPosition
 * @param {number} duration
 * @param {string} timingFunction
 */
export const animatedScrollToX = (
    elem: Element,
    pos: number,
    prevPosition: number,
    duration: number = DEFAULT_DURATION,
    timingFunction: keyof typeof tfs = 'easeIn',
): void => {
    let startTime: number;

    const handleNewAnimationFrame = (): void => {
        startTime = startTime || Date.now();
        const timePos = Math.min(1, Math.max(1, Date.now() - startTime) / duration);
        const scrollPos = tfs[timingFunction](timePos);
        const left = prevPosition + (pos - prevPosition) * scrollPos;
        elem.scrollTo(left, 0);
        if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
    };

    window.requestAnimationFrame(handleNewAnimationFrame);
};

/**
 * Плавная прокрутка по вертикали
 * @param {Element} elem
 * @param {number} pos
 * @param {number} prevPosition
 * @param {number} duration
 * @param {string} timingFunction
 */
export const animatedScrollToY = (
    elem: Element,
    pos: number,
    prevPosition: number,
    duration: number = DEFAULT_DURATION,
    timingFunction: keyof typeof tfs = 'easeInOut',
): void => {
    let startTime: number;

    const handleNewAnimationFrame = (): void => {
        startTime = startTime || Date.now();
        const timePos = Math.min(1, Math.max(1, Date.now() - startTime) / duration);
        const scrollPos = tfs[timingFunction](timePos);
        const top = prevPosition + (pos - prevPosition) * scrollPos;
        elem.scrollTo(0, top);
        if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
    };

    window.requestAnimationFrame(handleNewAnimationFrame);
};
