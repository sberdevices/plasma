import React from 'react';
import styled, { css } from 'styled-components';

import { animatedScrollToX, animatedScrollToY } from '../../utils/animatedScrollTo';

import { CarouselStore, CarouselContext } from './CarouselContext';
import { StyledCarouselItem } from './CarouselItem';
import { StyledCarouselCol } from './CarouselCol';

type Axis = 'x' | 'y';

interface DirectionProps {
    /**
     * Ось скроллирования
     */
    axis: Axis;
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
    ${({ axis }) =>
        axis === 'x'
            ? css`
                  width: 100%;
                  overflow-x: auto;
                  overflow-y: hidden;
              `
            : css`
                  height: 100%;
                  overflow-x: hidden;
                  overflow-y: auto;
              `}

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
    ${({ axis }) =>
        axis === 'x'
            ? css`
                  display: inline-flex;
                  flex-direction: row;
              `
            : css`
                  display: flex;
                  flex-direction: column;
              `}
`;

export interface CarouselProps extends DirectionProps, SnapProps {
    /**
     * Индекс текущего элемента
     */
    index: number;
    /**
     * Анимированная прокрутка с помощью requestAnimationFrame
     */
    animated?: boolean;
}

export const Carousel: React.FC<CarouselProps & React.HTMLAttributes<HTMLDivElement>> = ({
    index,
    axis,
    animated = true,
    children,
    ...rest
}) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const store = React.useMemo(() => new CarouselStore(), []);

    React.useEffect(() => {
        if (carouselRef.current) {
            let pos = 0;
            for (let i = index - 1; i >= 0; i--) {
                const itemRef = store.getItem(i);
                if (itemRef && itemRef.current) {
                    if (axis === 'x') {
                        pos += itemRef.current.offsetWidth;
                    } else {
                        pos += itemRef.current.offsetHeight;
                    }
                }
            }

            let carouselSize;
            let itemSize;

            if (axis === 'x') {
                carouselSize = carouselRef.current.offsetWidth;
                itemSize = store.getItem(index)?.current?.offsetWidth || 0;
            } else {
                carouselSize = carouselRef.current.offsetHeight;
                itemSize = store.getItem(index)?.current?.offsetHeight || 0;
            }
            console.log(axis, pos, carouselSize, itemSize);
            pos -= carouselSize / 2 - itemSize / 2;

            if (axis === 'x') {
                if (animated) {
                    animatedScrollToX(carouselRef.current, pos);
                } else {
                    carouselRef.current.scrollTo({ left: pos });
                }
            }
            if (axis === 'y') {
                if (animated) {
                    animatedScrollToY(carouselRef.current, pos);
                } else {
                    carouselRef.current.scrollTo({ top: pos });
                }
            }
        }
    }, [axis, index, store]);

    return (
        <CarouselContext.Provider value={store}>
            <StyledCarousel ref={carouselRef} axis={axis} {...rest}>
                <StyledCarouselTrack axis={axis}>{children}</StyledCarouselTrack>
            </StyledCarousel>
        </CarouselContext.Provider>
    );
};
