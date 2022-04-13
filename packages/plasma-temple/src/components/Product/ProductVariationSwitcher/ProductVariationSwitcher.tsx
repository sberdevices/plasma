import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselItem, mediaQuery } from '@sberdevices/plasma-ui';
import { footnote2, paragraph2 } from '@sberdevices/plasma-tokens';

import { ProductVariationItem } from './ProductVariationItem/ProductVariationItem';

export interface ProductVariationSwitcherProps {
    /** Заголовок */
    title: React.ReactNode;
    /** Варианты товара */
    variations: React.ReactNode[];
    /** Выбранный вариант */
    activeIndex: number;
    className?: string;
    /** Колбэк, вызываемый при выборе варианта */
    onChange: (index: number) => void;
}

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
`;

const StyledTitle = styled.div`
    ${footnote2}

    ${mediaQuery(
        'XL',
        2,
    )(css`
        ${paragraph2}
    `)}
    margin-bottom: 0.45rem;
`;

const StyledCarouselItem = styled(CarouselItem)`
    padding: 0.25rem;
`;

const StyledCarousel = styled(Carousel)`
    mask-image: linear-gradient(270deg, rgba(196, 196, 196, 0) 0%, #c4c4c4 25.92%);
`;

/** Компонент предназначен для выбора модификации товара */
export const ProductVariationSwitcher = React.memo<ProductVariationSwitcherProps>(
    ({ title, variations, activeIndex, className, onChange }) => {
        const [carouselIndex, setCarouselIndex] = React.useState(activeIndex);

        const handleClick = React.useCallback((index: number) => {
            onChange(index);
            setCarouselIndex(index);
        }, []);

        return (
            <StyledContainer className={className}>
                <StyledTitle>{title}</StyledTitle>

                <StyledCarousel axis="x" index={carouselIndex} scrollAlign="start" paddingEnd="5rem">
                    {variations.map((variation, index) => (
                        <StyledCarouselItem scrollSnapAlign="start" key={index}>
                            <ProductVariationItem
                                index={index}
                                active={index === activeIndex}
                                variation={variation}
                                onClick={handleClick}
                                onFocus={setCarouselIndex}
                            />
                        </StyledCarouselItem>
                    ))}
                </StyledCarousel>
            </StyledContainer>
        );
    },
);
