import React, { useRef } from 'react';
import { CarouselGridWrapper } from '@sberdevices/plasma-ui';

import { fixturesVirtualizedItems } from '../fixtures';
import { DEFAULT_VIRTUAL_ITEM_SIZE } from '../constants';
import { useVirtualSmoothScroll } from '../../src';

import { CarouselItemMemoTransform } from './CarouselItem';

const ITEM_GAP = 70;
const estimateSize = () => DEFAULT_VIRTUAL_ITEM_SIZE + ITEM_GAP;

export const VirtualVertical = () => {
    const parentRef = useRef<null | HTMLDivElement>(null);

    const { visibleItems, totalSize, currentIndex } = useVirtualSmoothScroll({
        itemsLength: fixturesVirtualizedItems.length,
        parentRef,
        horizontal: false,
        estimateSize,
    });

    return (
        <CarouselGridWrapper
            ref={parentRef}
            style={{
                height: DEFAULT_VIRTUAL_ITEM_SIZE * 3,
                overflow: 'auto',
                padding: '1.25rem',
            }}
        >
            <div
                style={{
                    height: `${totalSize}px`,
                    position: 'relative',
                }}
            >
                {visibleItems.map(({ index, start }) => {
                    const item = fixturesVirtualizedItems[index];

                    return (
                        <CarouselItemMemoTransform
                            key={index}
                            focused={currentIndex === index}
                            horizontal={false}
                            start={start}
                            index={index}
                            width={DEFAULT_VIRTUAL_ITEM_SIZE}
                            height={DEFAULT_VIRTUAL_ITEM_SIZE}
                            item={item}
                            gap={ITEM_GAP}
                        />
                    );
                })}
            </div>
        </CarouselGridWrapper>
    );
};
