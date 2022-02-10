import React from 'react';
import { Col, mediaQuery, Row } from '@sberdevices/plasma-ui';
import styled, { css } from 'styled-components';

import { ProductTitle } from './ProductTitle/ProductTitle';
import { ProductPrice } from './ProductPrice/ProductPrice';
import { ProductImage } from './ProductImage/ProductImage';
import { ProductActionButton, ProductActionButtonProps } from './ProductActionButton/ProductActionButton';
import { ProductVariationSwitcher } from './ProductVariationSwitcher/ProductVariationSwitcher';
import { ProductDetails } from './ProductDetails/ProductDetails';
import { ExpandableProductDetails } from './ProductDetails/ExpandableProductDetails/ExpandableProductDetails';
import { ProductInfo } from './ProductInfo/ProductInfo';
import { ProductEntity, ProductVariation as ProductVariationType } from './types';
import { useScrollByBreakpoints } from './hooks/useScrollByBreakpoints';
import { ProductRecommendations } from './ProductRecommendations/ProductRecommendations';
import { ProductToggleButtonProps } from './ProductToggleButton/ProductToggleButton';

export interface ProductProps<Id = unknown, VariationId = unknown> {
    product: ProductEntity<Id>;
    actionButtonProps: ProductActionButtonProps;
    variations?: ProductVariationType<VariationId>[];
    recommendations?: { title: string; items: ProductEntity<Id>[] };
    defaultImage?: string;
    className?: string;
    onChangeVariation?: (id: VariationId, index: number) => void;
    onClickRecommendation?: (recommendation: ProductEntity<Id>, index: number) => void;
    renderToggleButton?: (props: Pick<ProductToggleButtonProps, 'expanded' | 'toggle'>) => React.ReactNode;
}

const StyledProductImage = styled(ProductImage)`
    height: 19rem;
    width: 19rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        height: 10.31rem;
        width: 10.31rem;
    `)}
`;

const StyledRow = styled(Row)`
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
        opacity: 0;
        width: 0;
    }
`;

const StyledRightCol = styled(Col)`
    display: flex;
    justify-content: flex-end;
`;

const StyledTitle = styled(ProductTitle)`
    margin-bottom: 0.5rem;
`;

const StyledSmallSection = styled.div`
    margin-bottom: 1.5rem;
`;

const StyledSection = styled.div`
    position: relative;
    margin-bottom: 3rem;

    ${mediaQuery(
        'L',
        2,
    )(css`
        margin-bottom: 2rem;
    `)}
`;

export const ProductVariation: React.FC<ProductVariationType & { onChange: ProductProps['onChangeVariation'] }> = ({
    id,
    name,
    variations,
    activeIndex,
    onChange,
}) => {
    const handleChange = React.useCallback(
        (index: number) => {
            onChange?.(id, index);
        },
        [id],
    );

    return (
        <ProductVariationSwitcher
            title={name}
            activeIndex={activeIndex}
            variations={variations}
            onChange={handleChange}
        />
    );
};

export const ProductCommon = ({
    product,
    actionButtonProps,
    variations = [],
    recommendations,
    defaultImage,
    className,
    onChangeVariation,
    onClickRecommendation,
    renderToggleButton,
}: ProductProps) => {
    const {
        name,
        shortDescription,
        price,
        oldPrice,
        currency,
        shortDetails,
        details,
        description,
        images = [],
    } = product;

    const buttonRef = React.useRef<HTMLDivElement>(null);
    const variationRef = React.useRef<HTMLDivElement>(null);
    const shortDetailsRef = React.useRef<HTMLDivElement>(null);
    const detailsRef = React.useRef<HTMLDivElement>(null);
    const descriptionRef = React.useRef<HTMLDivElement>(null);
    const recommendationsRef = React.useRef<HTMLDivElement>(null);

    const scrollableRef = useScrollByBreakpoints([
        buttonRef,
        variationRef,
        shortDetailsRef,
        detailsRef,
        descriptionRef,
        recommendationsRef,
    ]);

    return (
        <StyledRow className={className} ref={scrollableRef}>
            <Col sizeXL={7} sizeM={4}>
                <StyledTitle title={name} subtitle={shortDescription} />
                {price && (
                    <StyledSmallSection>
                        <ProductPrice price={price} oldPrice={oldPrice} currency={currency} />
                    </StyledSmallSection>
                )}
                <StyledSmallSection ref={buttonRef}>
                    <ProductActionButton {...actionButtonProps} />
                </StyledSmallSection>
                {variations.length > 0 && (
                    <div ref={variationRef}>
                        {variations.map((variation) => (
                            <StyledSmallSection>
                                <ProductVariation {...variation} onChange={onChangeVariation} />
                            </StyledSmallSection>
                        ))}
                    </div>
                )}
                {shortDetails && (
                    <StyledSection ref={shortDetailsRef}>
                        <ProductDetails details={shortDetails} />
                    </StyledSection>
                )}
                {details && (
                    <StyledSection ref={detailsRef}>
                        <ExpandableProductDetails
                            title={details.title}
                            details={details.values}
                            fixedLines={6}
                            renderToggleButton={renderToggleButton}
                        />
                    </StyledSection>
                )}
                {description && (
                    <StyledSection ref={descriptionRef}>
                        <ProductInfo
                            title={description.title}
                            info={description.content}
                            fixedHeight={500}
                            renderToggleButton={renderToggleButton}
                        />
                    </StyledSection>
                )}
            </Col>
            <StyledRightCol sizeXL={5} sizeM={2}>
                <StyledProductImage src={images?.[0]} defaultSrc={defaultImage} />
            </StyledRightCol>
            <Col sizeXL={12} sizeM={6}>
                {recommendations && recommendations.items.length > 0 && (
                    <StyledSection ref={recommendationsRef}>
                        <ProductRecommendations
                            title={recommendations.title}
                            recommendations={recommendations.items}
                            onClick={onClickRecommendation}
                        />
                    </StyledSection>
                )}
            </Col>
        </StyledRow>
    );
};
