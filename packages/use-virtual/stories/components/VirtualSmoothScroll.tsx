import { CarouselGridWrapper } from '@sberdevices/plasma-ui';
import React, { useMemo, useRef } from 'react';

import { fixturesVirtualizedItems } from '../fixtures';
import { DEFAULT_VIRTUAL_ITEM_GAP, DEFAULT_VIRTUAL_ITEM_SIZE } from '../constants';
import { useVirtualSmoothScroll } from '../../src';

// import { ReactProfiler } from './ReactProfiler';
import { CarouselItemMemoTransform } from './CarouselItem';

export const VirtualSmoothScroll = ({
    horizontal,
    estimateSizeAndGap,
    paddingStart,
    paddingEnd,
}: {
    horizontal: boolean;
    estimateSizeAndGap: (index: number) => { size: number; gap: number };
    paddingStart?: number;
    paddingEnd?: number;
}) => {
    const parentRef = useRef<null | HTMLDivElement>(null);

    const estimateSize = useMemo(() => {
        return (i: number) => {
            const { size, gap } = estimateSizeAndGap(i);

            return size + gap;
        };
    }, [estimateSizeAndGap]);

    const { visibleItems, totalSize, currentIndex } = useVirtualSmoothScroll({
        itemsLength: fixturesVirtualizedItems.length,
        parentRef,
        horizontal,
        paddingStart,
        paddingEnd,
        estimateSize,
    });

    return (
        // <ReactProfiler id="VirtualSmoothScroll">
        <CarouselGridWrapper
            ref={parentRef}
            style={{
                [horizontal ? 'height' : 'width']: DEFAULT_VIRTUAL_ITEM_SIZE,
                overflow: 'auto',
                padding: '1.25rem',
                ...(horizontal && { height: DEFAULT_VIRTUAL_ITEM_SIZE * 3 }),
            }}
        >
            <div
                style={{
                    [horizontal ? 'width' : 'height']: `${totalSize}px`,
                    position: 'relative',
                }}
            >
                {visibleItems.map(({ index, start }) => {
                    const item = fixturesVirtualizedItems[index];
                    const { size, gap } = estimateSizeAndGap
                        ? estimateSizeAndGap(index)
                        : {
                              size: DEFAULT_VIRTUAL_ITEM_SIZE,
                              gap: DEFAULT_VIRTUAL_ITEM_GAP,
                          };

                    return (
                        <CarouselItemMemoTransform
                            key={index}
                            focused={currentIndex === index}
                            horizontal={horizontal}
                            start={start}
                            index={index}
                            width={size}
                            height={DEFAULT_VIRTUAL_ITEM_SIZE}
                            item={item}
                            gap={gap}
                        />
                    );
                })}
            </div>
        </CarouselGridWrapper>
        // </ReactProfiler>
    );
};
