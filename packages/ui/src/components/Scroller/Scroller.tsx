import React from 'react';
import styled from 'styled-components';

import ScrollerItem from './ScrollerItem';
import ScrollerContext, { ScrollerContextData, ScrollerContextProps } from './ScrollerContext';

const OVER_WIDTH = 15;

function easeInOutQuad(t: number) {
    if (t < 0.5) {
        return 2 * t * t;
    }

    return -1 + (4 - 2 * t) * t;
}

function scrollTo(element: HTMLElement, offset: number, duration: number) {
    let start = 0;
    const scrollStart = element.scrollLeft;

    requestAnimationFrame(function animate(timestamp) {
        if (start === 0) {
            start = timestamp;
        }

        let timeFraction = (timestamp - start) / duration;

        if (timeFraction > 1) {
            timeFraction = 1;
        }

        const diff = Math.ceil(offset * easeInOutQuad(timeFraction));

        element.scrollLeft = scrollStart + diff;

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

export interface ScrollerProps {
    className?: string;
    /** Индекс первого видимого элемента списка, до него будет осуществлен скролл по умолчанию 0 */
    index?: number;
    gap?: number;
    onScroll?: () => void;
    scrollOffset?: number;
    duration?: number;
}

const StyledWrapper = styled.div`
    position: relative;
    z-index: 1;
    overflow: -moz-scrollbars-none !important;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    white-space: nowrap;

    -ms-overflow-style: none;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledRoot = styled.div`
    position: relative;
    color: white;

    ${StyledWrapper} {
        margin-right: -${OVER_WIDTH}px;
        margin-left: -${OVER_WIDTH}px;
        padding-right: ${OVER_WIDTH}px;
        padding-left: ${OVER_WIDTH}px;
    }
`;

export const Scroller: React.FC<ScrollerProps> = ({
    gap = 32,
    index = 0,
    scrollOffset = 0,
    duration = 300,
    children,
}) => {
    const scrollRef = React.useRef<HTMLDivElement>();

    const ctx = React.useMemo<ScrollerContextProps>(() => new ScrollerContextData(), []);

    React.useEffect(() => {
        const currentItem = ctx.getItem(index)?.current;
        const currentScroll = scrollRef.current;

        if (currentItem && currentScroll) {
            const offset = currentItem.offsetLeft - scrollOffset - (currentScroll.scrollLeft + OVER_WIDTH);
            scrollTo(currentScroll, offset, duration);
        }
    }, [index, duration, scrollOffset, ctx]);

    return (
        <ScrollerContext.Provider value={ctx}>
            <StyledRoot>
                <StyledWrapper ref={scrollRef as React.MutableRefObject<HTMLInputElement>}>
                    <>
                        {React.Children.map(children, (child) => (
                            <ScrollerItem gap={gap}>{child}</ScrollerItem>
                        ))}
                    </>
                </StyledWrapper>
            </StyledRoot>
        </ScrollerContext.Provider>
    );
};
