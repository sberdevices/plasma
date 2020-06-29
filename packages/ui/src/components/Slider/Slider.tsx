import React from 'react';
import styled from 'styled-components';

import SliderContext, { SliderContextController } from './SliderContext';
import SliderItem from './SliderItem';

interface SliderProps {
    className?: string;
    index?: number;
    offsetLeft?: number;
    offsetRight?: number;
    children: React.ReactElement[];
}

interface StyledRootProps {
    offsetLeft: number;
    offsetRight: number;
}

const StyledRoot = styled.div<StyledRootProps>`
    position: relative;
    overflow: -moz-scrollbars-none !important;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;

    scrollbar-width: none;

    width: 100%;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledWrapper = styled.div`
    position: relative;
    display: inline-block;
    white-space: nowrap;
    transition: transform 0.4s ease-in-out;
`;

const preventScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.currentTarget.scrollLeft = 0;
};

export const Slider: React.FC<SliderProps> = ({ className, index = 0, offsetRight = 0, offsetLeft = 0, children }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [focused, setFocused] = React.useState(false);
    const [currentOffset, setCurrentOffset] = React.useState(0);

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);

    const count = React.useMemo(() => React.Children.count(children), [children]);

    const ctx = React.useMemo(() => new SliderContextController(), []);

    const rootWidth = React.useRef(0);
    const wrapperWidth = React.useRef(0);

    React.useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    React.useLayoutEffect(() => {
        if (rootRef.current && wrapperRef.current) {
            rootWidth.current = rootRef.current.getBoundingClientRect().width;
            wrapperWidth.current = wrapperRef.current.getBoundingClientRect().width;
        }
    }, []);

    React.useEffect(() => {
        const currentItem = ctx.getItem(currentIndex)?.current;
        if (currentItem) {
            currentItem.focus({ preventScroll: true });

            const offset = currentItem.offsetLeft;
            const diffTail = wrapperWidth.current - (rootWidth.current + offset) + offsetLeft;
            if (diffTail < 0) {
                setCurrentOffset(-(offset + diffTail + offsetRight));
            } else {
                setCurrentOffset(-(offset - offsetLeft));
            }
        }
    }, [currentIndex, offsetLeft, offsetRight, ctx]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (!focused) {
                return;
            }

            if (event.keyCode === 37) {
                setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
            } else if (event.keyCode === 39) {
                setCurrentIndex(currentIndex < count - 1 ? currentIndex + 1 : count - 1);
            }
        },
        [focused, count, currentIndex],
    );

    return (
        <SliderContext.Provider value={ctx}>
            <StyledRoot
                offsetLeft={offsetLeft}
                offsetRight={offsetRight}
                className={className}
                tabIndex={0}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                onScroll={preventScroll}
                ref={rootRef}
            >
                <StyledWrapper ref={wrapperRef} style={{ transform: `translateX(${currentOffset}px)` }}>
                    {React.Children.map(children, (child) => (
                        <SliderItem>{child}</SliderItem>
                    ))}
                </StyledWrapper>
            </StyledRoot>
        </SliderContext.Provider>
    );
};

export default Slider;
