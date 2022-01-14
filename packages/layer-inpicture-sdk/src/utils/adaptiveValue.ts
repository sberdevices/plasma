export const adaptiveValue = (maxSize: number, minSize: number) => {
    const addSize = maxSize - minSize;

    return `calc(${minSize}px + ${addSize} * ((100vw - ${320}px) / ${1920 - 320}))`;
};
