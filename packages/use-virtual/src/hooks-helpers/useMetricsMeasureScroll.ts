import { useCallback, useEffect, useRef } from 'react';

const NUMBER_OF_METRICS_TO_COLLECT = 4;
// TODO: inject webTelemetryKV from component
// const sendMetrics = async (
// payload: Array<{
//     frameDuration: number;
//     frameCounter: number;
// }>,
// ) => {
// const meta = {
//     widget: 'useVirtual',
//     event: 'scroll',
// };
// for (const { frameDuration, frameCounter } of payload) {

// TODO: pass webTelemetryKV instance
// webTelemetryKV.push(
//     {
//         key: 'frameDuration',
//         value: frameDuration,
//     },
//     meta,
// );
// webTelemetryKV.push(
//     {
//         key: 'frameCounter',
//         value: frameCounter,
//     },
//     meta,
// );
// }
// };

export const useMetricsMeasureScroll = () => {
    const ref = useRef<{
        buffer: number[];
        now: number;
        prevEvent: 'rAF' | 'scroll';
        lastScrollNow: null | number;
        metrics: Array<{
            frameDuration: number;
            frameCounter: number;
        }>;
    }>({
        buffer: [],
        now: 0,
        prevEvent: 'rAF',
        lastScrollNow: null,
        metrics: [],
    });

    useEffect(() => {
        ref.current.now = performance.now();
        const runMetric = () => {
            if (ref.current.metrics.length >= NUMBER_OF_METRICS_TO_COLLECT) {
                return;
            }

            const newNow = performance.now();
            const diff = newNow - ref.current.now;

            if (ref.current.prevEvent === 'scroll') {
                ref.current.buffer.push(diff);
            } else if (ref.current.prevEvent === 'rAF' && ref.current.buffer.length > 0) {
                const { buffer } = ref.current;
                ref.current.lastScrollNow = newNow;
                ref.current.metrics.push({
                    frameDuration: Math.round(buffer.reduce((a, b) => a + b, 0) / buffer.length),
                    frameCounter: buffer.length,
                });
                ref.current.buffer = [];
            }

            ref.current.prevEvent = 'rAF';
            ref.current.now = newNow;
            requestAnimationFrame(runMetric);

            if (ref.current.metrics.length >= NUMBER_OF_METRICS_TO_COLLECT) {
                // sendMetrics(ref.current.metrics);
            }
        };
        runMetric();
    }, []);

    const measureScroll = useCallback(() => {
        ref.current.prevEvent = 'scroll';
    }, []);

    return measureScroll;
};
