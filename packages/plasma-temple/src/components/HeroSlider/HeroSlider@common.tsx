import React from 'react';
import styled, { keyframes } from 'styled-components';
import { primary, tertiary } from '@sberdevices/plasma-tokens';

import { useRemoteHandlers } from '../../hooks';
import { useTouchHandler } from '../../hooks/useTouchHander';
import { UnifiedComponentProps } from '../../registry/types';
import { HeroSlideProps } from '../HeroSlide/HeroSlide';

import { HeroSliderProps } from './types';

interface StyledTimelineProps {
    count: number;
    filled: boolean;
}

interface StyledPimelineProgressProps {
    time: number;
}

const StyledTimline = styled.span<StyledTimelineProps>`
    width: ${(props) => 100 / props.count}%;
    height: 4px;
    border-radius: 2px;

    ${(props) => {
        if (props.filled) {
            return {
                backgroundColor: primary,
            };
        }

        return {
            backgroundColor: tertiary,
        };
    }}

    & + & {
        margin-left: 1rem;
    }
`;

const fillAmination = keyframes`
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
`;

const StyledTimelineProgress = styled.i<StyledPimelineProgressProps>`
    display: flex;
    height: 4px;
    border-radius: 2px;
    background-color: ${primary};

    animation-name: ${fillAmination};
    animation-timing-function: linear;
    animation-duration: ${(props) => props.time}ms;
    animation-iteration-count: 1;
`;

const StyledDotsWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    margin-top: auto;
`;

interface HeroDotsProps {
    count: number;
    current: number;
    time: number;
}

const HeroDots: React.FC<HeroDotsProps> = ({ count, current, time }) => {
    const itemsToRender = React.useMemo(() => Array.from({ length: count }), [count]);

    return (
        <StyledDotsWrapper>
            {itemsToRender.map((_, i) => (
                <StyledTimline count={count} filled={i < current} key={i}>
                    {i === current && <StyledTimelineProgress time={time} />}
                </StyledTimline>
            ))}
        </StyledDotsWrapper>
    );
};

type PlatformComponents = {
    Wrapper: React.RefAttributes<HTMLDivElement>;
    Slide: HeroSlideProps;
};

export const HeroSlider: React.FC<UnifiedComponentProps<HeroSliderProps, PlatformComponents>> = ({
    time = 10000,
    withTimeline = true,
    initialIndex = 0,
    items,
    onItemClick,
    onActiveItemChange,
    buttonText,
    platformComponents: { Wrapper, Slide },
}) => {
    const [isActive, setIsActive] = React.useState(false);
    const childLen = React.useRef(items.length);
    const timerRef = React.useRef<number>(Infinity);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useRemoteHandlers({
        axis: 'x',
        initialIndex,
        min: 0,
        max: childLen.current - 1,
        longCount: 1,
        disable: !isActive,
    });

    useTouchHandler(containerRef, (dir) => {
        setActiveIndex((prev) => {
            const nextIndex = prev + dir;

            if (nextIndex < 0 || nextIndex > childLen.current - 1) {
                return prev;
            }

            return nextIndex;
        });
    });

    React.useLayoutEffect(() => {
        timerRef.current = window.setTimeout(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex > childLen.current - 1) {
                nextIndex = 0;
            }
            setActiveIndex(nextIndex);
        }, time);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [activeIndex, setActiveIndex, time]);

    const item = React.useMemo(() => items[activeIndex], [items, activeIndex]);

    React.useEffect(() => {
        onActiveItemChange?.(item, activeIndex);
    }, [item, activeIndex, onActiveItemChange]);

    const handleClick = React.useCallback(() => {
        onItemClick?.(item, activeIndex);
    }, [item, onItemClick]);

    const handleFocus = React.useCallback(() => {
        setIsActive(true);
    }, []);

    const handleBlur = React.useCallback(() => {
        setIsActive(false);
    }, []);

    return (
        <Wrapper ref={containerRef}>
            <Slide {...item} onClick={handleClick} buttonText={buttonText} onFocus={handleFocus} onBlur={handleBlur}>
                {withTimeline && <HeroDots count={childLen.current} current={activeIndex} time={time} />}
            </Slide>
        </Wrapper>
    );
};
