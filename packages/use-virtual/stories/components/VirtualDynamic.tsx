import { CarouselGridWrapper } from '@sberdevices/plasma-ui';
import React, { useRef } from 'react';

import { fixturesVirtualizedItems } from '../fixtures';
import { DEFAULT_VIRTUAL_ITEM_GAP, DEFAULT_VIRTUAL_ITEM_SIZE } from '../constants';
import { useVirtualDynamic } from '../../src';

import { ReactProfiler } from './ReactProfiler';
import { CarouselItemMemoTransform } from './CarouselItem';

export const VirtualDynamic = ({ axis = 'x' }: { axis?: 'x' | 'y' }) => {
    const parentRef = useRef<null | HTMLDivElement>(null);

    const { totalSize, visibleItems, currentIndex, observeItem, unobserveItem } = useVirtualDynamic({
        itemsLength: fixturesVirtualizedItems.length,
        parentRef,
        horizontal: axis === 'x',
    });

    return (
        <ReactProfiler id="VirtualDynamic">
            <CarouselGridWrapper
                ref={parentRef}
                style={{
                    [axis === 'x' ? 'height' : 'width']: DEFAULT_VIRTUAL_ITEM_SIZE,
                    overflow: 'auto',
                    padding: '1.25rem',
                    ...(axis === 'y' && {
                        height: DEFAULT_VIRTUAL_ITEM_SIZE * 3,
                    }),
                }}
            >
                <div
                    style={{
                        [axis === 'x' ? 'width' : 'height']: `${totalSize}px`,
                        position: 'relative',
                    }}
                >
                    {visibleItems.map(({ index, start }) => {
                        const item = fixturesVirtualizedItems[index];
                        const size = index % 2 ? DEFAULT_VIRTUAL_ITEM_SIZE : 200;
                        const gap = index % 2 ? DEFAULT_VIRTUAL_ITEM_GAP : 50;

                        return (
                            <CarouselItemMemoTransform
                                key={index}
                                horizontal={axis === 'x'}
                                focused={currentIndex === index}
                                start={start}
                                index={index}
                                width={size}
                                height={DEFAULT_VIRTUAL_ITEM_SIZE}
                                item={item}
                                gap={gap}
                                observeItem={observeItem}
                                unobserveItem={unobserveItem}
                            />
                        );
                    })}
                </div>
            </CarouselGridWrapper>
        </ReactProfiler>
    );
};
