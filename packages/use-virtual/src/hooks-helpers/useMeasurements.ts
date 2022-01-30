import { useMemo } from 'react';

import { MeasurementItem, VirtualProps } from '../types';
import { defaultEstimateSize } from '../utils';

export const useMeasurements = ({
    estimateSize = defaultEstimateSize,
    itemCount,
    paddingStart,
    measuredCache,
    keyExtractor,
}: {
    estimateSize?: VirtualProps['estimateSize'];
    itemCount: number;
    paddingStart: number;
    keyExtractor: Required<VirtualProps>['keyExtractor'];
    /**
     * используется для динамического (неизвестного
     * до рендера) размера элемента
     */
    measuredCache?: Record<string, number>;
}) => {
    const measurements = useMemo(() => {
        const result: MeasurementItem[] = [];
        for (let i = 0; i < itemCount; i++) {
            const cacheKey = keyExtractor(i);
            const cachedSize = measuredCache?.[cacheKey];
            const start = result[i - 1] ? result[i - 1].end : paddingStart;
            const size = typeof cachedSize === 'number' ? cachedSize : estimateSize(i);
            // TODO check measuredCache[cacheKey]
            // measuredCache[cacheKey] = size;
            const end = start + size;
            result[i] = { index: i, start, size, end };
        }

        return result;
    }, [itemCount, paddingStart, estimateSize, measuredCache, keyExtractor]);

    return measurements;
};
