import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselItem, Headline3, mediaQuery } from '@sberdevices/plasma-ui';

import { ProductEntity } from '../types';

import { ProductRecommendationsItem } from './ProductRecommendationsItem/ProductRecommendationsItem';

export interface ProductRecommendationsProps<Id = unknown> {
    /** Заголовок */
    title: React.ReactNode;
    /** Рекомендации */
    recommendations: ProductEntity<Id>[];
    className?: string;
    /** Колбэк, вызываемый при клике по карточке рекомендации */
    onClick?: (recommendation: ProductEntity, index: number) => void;
}

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
`;

const StyledTitle = styled(Headline3)`
    margin-bottom: 1rem;
`;

const StyledCarouselItem = styled(CarouselItem)`
    padding: 0.25rem;
    margin-right: 0.75rem;

    ${mediaQuery(
        'S',
        1,
    )(css`
        margin-right: 0.25rem;
    `)}
`;

function ProductRecommendationsComponent<Id = unknown>({
    title,
    recommendations,
    className,
    onClick,
}: ProductRecommendationsProps<Id>) {
    const [carouselIndex, setCarouselIndex] = React.useState(0);

    const handleClick = React.useCallback((recommendation: ProductEntity, index: number) => {
        onClick?.(recommendation, index);
        setCarouselIndex(index);
    }, []);

    return (
        <StyledContainer className={className}>
            <StyledTitle>{title}</StyledTitle>

            <Carousel axis="x" index={carouselIndex} scrollAlign="start" paddingEnd="5rem">
                {recommendations.map((recommendation, index) => (
                    <StyledCarouselItem scrollSnapAlign="start">
                        <ProductRecommendationsItem
                            key={index}
                            index={index}
                            recommendation={recommendation}
                            onClick={handleClick}
                            onFocus={setCarouselIndex}
                        />
                    </StyledCarouselItem>
                ))}
            </Carousel>
        </StyledContainer>
    );
}

/** Компонент для показа рекомендаций на странице товара */
export const ProductRecommendations = React.memo(
    ProductRecommendationsComponent,
) as typeof ProductRecommendationsComponent;
