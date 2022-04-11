import React from 'react';
import styled from 'styled-components';

import { ProductTitle } from './ProductTitle/ProductTitle';
import { ProductPrice } from './ProductPrice/ProductPrice';
import { ProductActionButton } from './ProductActionButton/ProductActionButton';
import { ProductDetails } from './ProductDetails/ProductDetails';
import { ExpandableProductDetailsMobile } from './ProductDetails/ExpandableProductDetails/ExpandableProductDetails@mobile';
import { ProductInfoMobile } from './ProductInfo/ProductInfo@mobile';
import { ProductProps, ProductVariation } from './Product@common';
import { ProductImageSlider } from './ProductImageSlider/ProductImageSlider';
import { ProductRecommendations } from './ProductRecommendations/ProductRecommendations';

const StyledTitle = styled(ProductTitle)`
    margin-top: 2.25rem;
    margin-bottom: 0.75rem;
`;

const StyledSmallSection = styled.div`
    margin-bottom: 1.5rem;
`;

const StyledSection = styled.div`
    margin-bottom: 2rem;
`;

export const ProductMobile = ({
    product,
    variations,
    recommendations,
    actionButtonProps,
    defaultImage,
    onChangeVariation,
    onClickRecommendation,
}: ProductProps) => {
    const { name, shortDescription, price, oldPrice, shortDetails, details, description, images = [] } = product;

    return (
        <>
            <ProductImageSlider images={images} defaultImage={defaultImage} />
            <StyledTitle title={name} subtitle={shortDescription} />
            {price && (
                <StyledSmallSection>
                    <ProductPrice price={price} oldPrice={oldPrice} />
                </StyledSmallSection>
            )}
            <StyledSection>
                <ProductActionButton {...actionButtonProps} />
            </StyledSection>
            {variations?.map((variation) => (
                <StyledSmallSection key={String(variation.id)}>
                    <ProductVariation {...variation} onChange={onChangeVariation} />
                </StyledSmallSection>
            ))}
            {shortDetails && (
                <StyledSection>
                    <ProductDetails details={shortDetails} />
                </StyledSection>
            )}
            {details && (
                <StyledSection>
                    <ExpandableProductDetailsMobile title={details.title} details={details.values} />
                </StyledSection>
            )}
            {description && (
                <StyledSection>
                    <ProductInfoMobile title={description.title} info={description.content} />
                </StyledSection>
            )}
            {recommendations && recommendations.items.length > 0 && (
                <StyledSection>
                    <ProductRecommendations
                        title="Похожие товары"
                        recommendations={recommendations.items}
                        onClick={onClickRecommendation}
                    />
                </StyledSection>
            )}
        </>
    );
};
