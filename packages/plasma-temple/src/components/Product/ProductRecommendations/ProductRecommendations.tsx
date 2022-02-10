import React from 'react';
import styled, { css } from 'styled-components';
import {
    Carousel,
    CarouselItem,
    detectDevice,
    DeviceKind,
    Headline2,
    Headline3,
    Headline4,
    mediaQuery,
} from '@sberdevices/plasma-ui';

import { ProductEntity } from '../types';

import { ProductRecommendationsItem } from './ProductRecommendationsItem/ProductRecommendationsItem';

export interface ProductRecommendationsProps<Id = unknown> {
    title: React.ReactNode;
    recommendations: ProductEntity<Id>[];
    className?: string;
    onClick?: (recommendation: ProductEntity, index: number) => void;
}

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
`;

const mapDeviceToTitle: Record<DeviceKind, React.FC> = {
    sberBox: Headline2,
    sberPortal: Headline4,
    mobile: Headline3,
};

const StyledTitle = styled(mapDeviceToTitle[detectDevice()])`
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

export const ProductRecommendations = React.memo(
    ProductRecommendationsComponent,
) as typeof ProductRecommendationsComponent;
