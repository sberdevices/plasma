import React from 'react';
import styled, { css } from 'styled-components';

import { animatedScrollToX } from '../../utils/animatedScrollTo';

import { CarouselStore, CarouselContext } from './CarouselContext';
import { StyledCarouselItem } from './CarouselItem';
import { StyledCarouselCol } from './CarouselCol';

interface DirectionProps {
    /**
     * Ось скроллирования
     */
    axis: 'x';
}

export type SnapType = 'mandatory' | 'proximity';
export type SnapAlign = 'start' | 'center' | 'end';

interface SnapProps {
    /**
     * Включить поддержку CSS Scroll Snap
     */
    scrollSnap?: boolean;
    /**
     * Тип Scroll Snap
     */
    scrollSnapType?: SnapType;
    /**
     * Центрирование Scroll Snap
     */
    scrollSnapAlign?: SnapAlign;
}

interface StyledCarouselProps extends DirectionProps, SnapProps {}

export const StyledCarousel = styled.div<StyledCarouselProps>`
    ${({ axis }) => css`
        ${axis === 'x' &&
        css`
            overflow-y: hidden;
            overflow-x: auto;
        `}
    `};

    ${({ scrollSnap, axis, scrollSnapType = 'mandatory', scrollSnapAlign = 'center' }) =>
        scrollSnap &&
        css`
            scroll-snap-type: ${axis} ${scrollSnapType};

            & ${StyledCarouselItem}, & ${StyledCarouselCol} {
                scroll-snap-align: ${scrollSnapAlign};
            }
        `}

    /* stylelint-disable-next-line selector-max-empty-lines, selector-nested-pattern, selector-type-no-unknown */
    ::-webkit-scrollbar {
        display: none;
    }
`;

interface StyledCarouselTrackProps extends DirectionProps {}

export const StyledCarouselTrack = styled.div<StyledCarouselTrackProps>`
    ${({ axis }) => css`
        ${axis === 'x' &&
        css`
            display: inline-flex;
            flex-direction: row;
        `}
    `};
`;

export interface CarouselProps extends DirectionProps, SnapProps {
    /**
     * Индекс текущего элемента
     */
    index: number;
}

export const Carousel: React.FC<CarouselProps & React.HTMLAttributes<HTMLDivElement>> = ({
    index,
    axis,
    children,
    ...rest
}) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const store = React.useMemo(() => new CarouselStore(), []);

    React.useEffect(() => {
        if (carouselRef.current) {
            let pos = 0;

            if (axis === 'x') {
                for (let i = index - 1; i >= 0; i--) {
                    const item = store.getItem(i);
                    if (item && item.current) {
                        pos += item.current.offsetWidth;
                    }
                }

                const carouselWidth = carouselRef.current.offsetWidth;
                const itemWidth = store.getItem(index)?.current?.offsetWidth || 0;
                pos -= carouselWidth / 2 - itemWidth / 2;
            }

            animatedScrollToX(carouselRef.current, pos);
        }
    }, [axis, index]);

    return (
        <CarouselContext.Provider value={store}>
            <StyledCarousel ref={carouselRef} axis={axis} {...rest}>
                <StyledCarouselTrack axis={axis}>{children}</StyledCarouselTrack>
            </StyledCarousel>
        </CarouselContext.Provider>
    );
};
