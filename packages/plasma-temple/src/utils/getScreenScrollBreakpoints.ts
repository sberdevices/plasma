export const getScreenScrollBreakpoints = (
    breakpointsOffsetTopOriginal: number[],
    screenHeight: number,
    scrollableCoefficient = 0.8,
): number[] => {
    const maxInterval = screenHeight * scrollableCoefficient;
    const breakpointsSorted = breakpointsOffsetTopOriginal.sort((a, b) => a - b);

    const intervalsBetweenBreakpoints = breakpointsSorted.reduce((acc: number[], current, index, list) => {
        const previous = list[index - 1] ?? 0;
        acc.push(current - previous);

        return acc;
    }, []);

    const normalizedIntervals = intervalsBetweenBreakpoints
        .flatMap((current) => [...Array(Math.floor(current / maxInterval)).fill(maxInterval), current % maxInterval])
        .filter((interval) => interval > 0);

    const newBreakpointsList = normalizedIntervals.reduce(
        (acc, current) => {
            const last = acc[acc.length - 1];

            acc.push(last + current);

            return acc;
        },
        [0],
    );

    return newBreakpointsList;
};
