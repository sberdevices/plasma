import React from 'react';
import styled, { css } from 'styled-components';

import { animatedScrollToX } from '../../utils/animatedScrollTo';

import { CarouselStore, CarouselContext } from './CarouselContext';

interface DirectionProps {
    /**
     * Ось скроллирования
     */
    axis: 'x';
}

interface StyledCarouselProps extends DirectionProps {}

export const StyledCarousel = styled.div<StyledCarouselProps>`
    ::-webkit-scrollbar {
        display: none;
    }

    ${({ axis }) => css`
        ${axis === 'x' &&
        css`
            overflow-y: hidden;
            overflow-x: auto;
        `}
    `};
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

export interface CarouselProps extends DirectionProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Индекс текущего элемента
     */
    index: number;
}

export const Carousel: React.FC<CarouselProps> = ({ index, axis, children, ...rest }) => {
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
