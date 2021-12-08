import React from 'react';
import styled from 'styled-components';

import { useVirtualKeyboard } from '../../src';
import { fixturesVirtualizedItems } from '../fixtures';
import { DEFAULT_VIRTUAL_ITEM_SIZE, DEFAULT_VIRTUAL_ITEM_GAP } from '../constants';

import { CarouselItemMemo } from './CarouselItem';
import { CarouselWrapperHorizontal } from './CarouselWrapper';
import { ReactProfiler } from './ReactProfiler';

const estimateSize = () => DEFAULT_VIRTUAL_ITEM_SIZE + DEFAULT_VIRTUAL_ITEM_GAP;

const StyledCarouselWrapperHorizontal = styled(CarouselWrapperHorizontal)`
    display: flex;
`;

export const VirtualKeyboard = () => {
    const { visibleItems, currentIndex } = useVirtualKeyboard({
        size: fixturesVirtualizedItems.length,
        limit: 5,
        estimateSize,
    });

    return (
        <ReactProfiler id="VirtualKeyboard">
            <StyledCarouselWrapperHorizontal>
                {visibleItems.map(({ index }) => {
                    const item = fixturesVirtualizedItems[index];

                    return (
                        <CarouselItemMemo
                            key={index}
                            focused={currentIndex === index}
                            index={index}
                            // style={{
                            //     transform: `translateX(${start - visibleItems[0].start}px)`,
                            // }}
                            width={DEFAULT_VIRTUAL_ITEM_SIZE}
                            height={DEFAULT_VIRTUAL_ITEM_SIZE}
                            item={item}
                            gap={DEFAULT_VIRTUAL_ITEM_GAP}
                        />
                    );
                })}
            </StyledCarouselWrapperHorizontal>
        </ReactProfiler>
    );
};
