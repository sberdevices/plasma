import { useMemo } from 'react';

import { MeasurementItem, VisibleRange } from '../types';

export function useVisibleItems<MI = MeasurementItem>(range: VisibleRange, measurements: MI[]) {
    const visibleItems = useMemo(() => {
        if (range.start === 0 && range.end === 0) return [];

        const result: MI[] = [];
        const end = Math.min(range.end, measurements.length - 1);

        for (let i = range.start; i <= end; i++) {
            result.push(measurements[i]);
        }

        return result;
    }, [measurements, range.end, range.start]);

    return visibleItems;
}
