import React, { useEffect, useRef } from 'react';

import { useVirtualSmoothScroll } from '../../src';
import { DEFAULT_VIRTUAL_ITEM_GAP, DEFAULT_VIRTUAL_ITEM_SIZE } from '../constants';
import { fixturesVirtualizedItems } from '../fixtures';

import { CarouselWrapperHorizontal } from './CarouselWrapper';
import { CarouselItemMemoTransform } from './CarouselItem';

const estimateSize = () => DEFAULT_VIRTUAL_ITEM_SIZE + DEFAULT_VIRTUAL_ITEM_GAP;

const CarouselItemMemoTransformAndPreview = ({
    isScrolling,
    ...props
}: React.ComponentProps<typeof CarouselItemMemoTransform> & {
    isScrolling: boolean;
}) => {
    const isMountedRefWOScrolling = useRef(false);
    useEffect(() => {
        if (!isScrolling) {
            isMountedRefWOScrolling.current = true;
        }
    }, [isScrolling]);

    const isPreview = !isMountedRefWOScrolling.current && isScrolling;

    if (isPreview) {
        return <CarouselItemMemoTransform {...props} background="grey" heavy={false} />;
    }

    return <CarouselItemMemoTransform {...props} />;
};

export const VirtualHorizontalHeavy = () => {
    const parentRef = useRef<null | HTMLDivElement>(null);

    const { visibleItems, totalSize, currentIndex, isScrolling } = useVirtualSmoothScroll({
        horizontal: true,
        itemCount: fixturesVirtualizedItems.length,
        parentRef,
        estimateSize,
        useIsScrolling: true,
    });

    return (
        <CarouselWrapperHorizontal ref={parentRef}>
            <div
                style={{
                    width: `${totalSize}px`,
                    position: 'relative',
                }}
            >
                {visibleItems.map(({ index, start }) => {
                    const item = fixturesVirtualizedItems[index];

                    return (
                        <CarouselItemMemoTransformAndPreview
                            key={index}
                            focused={currentIndex === index}
                            start={start}
                            index={index}
                            width={DEFAULT_VIRTUAL_ITEM_SIZE}
                            height={DEFAULT_VIRTUAL_ITEM_SIZE}
                            item={item}
                            gap={DEFAULT_VIRTUAL_ITEM_GAP}
                            heavy
                            isScrolling={isScrolling}
                        />
                    );
                })}
            </div>
        </CarouselWrapperHorizontal>
    );
};
