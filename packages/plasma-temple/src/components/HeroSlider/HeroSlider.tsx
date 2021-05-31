import React from 'react';
import styled, { keyframes } from 'styled-components';
import { primary, tertiary } from '@sberdevices/plasma-tokens';

import { useRemoteHandlers } from '../../hooks';
import { HeroSlideProps } from '../HeroSlide/HeroSlide';
import { useRegistry } from '../../hooks/useRegistry';

export interface HeroItemSliderProps extends Pick<HeroSlideProps, 'title' | 'src'> {
    id: string | number;
}

export interface HeroSliderProps {
    time: number;
    withTimeline?: boolean;
    items: HeroItemSliderProps[];
    onItemClick?: (item: HeroItemSliderProps) => void;
    buttonText: string;
}

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

const StyledWrapper = styled.div`
    display: flex;
    position: relative;

    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
    margin-bottom: -2.5rem;
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
                <StyledTimline count={count} filled={i < current}>
                    {i === current && <StyledTimelineProgress time={time} />}
                </StyledTimline>
            ))}
        </StyledDotsWrapper>
    );
};

export const HeroSlider: React.FC<HeroSliderProps> = ({
    time = 10000,
    withTimeline = true,
    items,
    onItemClick,
    buttonText,
}) => {
    const childLen = React.useRef(items.length);
    const timerRef = React.useRef<number>(Infinity);

    const { HeroSlide } = useRegistry();

    const [activeIndex, setActiveIndex] = useRemoteHandlers({
        axis: 'x',
        initialIndex: 0,
        min: 0,
        max: childLen.current - 1,
        repeat: true,
        longCount: 1,
    });

    React.useLayoutEffect(() => {
        timerRef.current = window.setTimeout(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= childLen.current) {
                nextIndex = 0;
            }
            setActiveIndex(nextIndex);
        }, time);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [activeIndex, setActiveIndex, time]);

    const item = React.useMemo(() => items[activeIndex], [items, activeIndex]);

    const handleClick = React.useCallback(() => {
        onItemClick?.(item);
    }, [item, onItemClick]);

    return (
        <StyledWrapper>
            <HeroSlide {...item} onClick={handleClick} buttonText={buttonText}>
                {withTimeline && <HeroDots count={childLen.current} current={activeIndex} time={time} />}
            </HeroSlide>
        </StyledWrapper>
    );
};
