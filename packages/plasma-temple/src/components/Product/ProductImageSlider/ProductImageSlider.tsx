import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselItem, SmartPaginationDots } from '@sberdevices/plasma-ui';

import { ProductImage } from '../ProductImage/ProductImage';

interface ImageSliderProps {
    /** Ссылки на картинки */
    images: string[];
    /** Ссылка на картинку по умолчанию */
    defaultImage?: string;
    className?: string;
}

const StyledWrapper = styled.div`
    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
`;

const StyledCarouselItem = styled(CarouselItem)`
    display: flex;
    justify-items: center;

    box-sizing: border-box;
    padding: 1rem;
    width: 100vw;
    height: 90vw;

    scroll-snap-stop: always;
`;

const StyledPaginationDots = styled(SmartPaginationDots)`
    justify-content: center;
`;

/** Компонент для отображения слайдера картинок товара. Актуально только для мобильной версии */
export const ProductImageSlider = React.forwardRef<HTMLDivElement, ImageSliderProps>(
    ({ images, defaultImage, className }, ref) => {
        const [index, setIndex] = React.useState(0);
        const paginationItems = images.map((id) => ({ id }));

        return (
            <StyledWrapper className={className}>
                <Carousel
                    ref={ref}
                    axis="x"
                    index={index}
                    scrollAlign="start"
                    animatedScrollByIndex
                    detectActive
                    detectThreshold={0.4}
                    onIndexChange={setIndex}
                >
                    {images.map((image, i) => (
                        <StyledCarouselItem
                            key={`${image}-${i}`}
                            scrollSnapAlign="start"
                            data-name="ProductImageSlider-item"
                        >
                            <ProductImage src={image} defaultSrc={defaultImage} data-cy="ProductImageSlider-image" />
                        </StyledCarouselItem>
                    ))}
                </Carousel>
                {paginationItems.length > 1 && (
                    <StyledPaginationDots index={index} items={paginationItems} visibleItems={10} />
                )}
            </StyledWrapper>
        );
    },
);
