import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui';
import { button2, headline3, paragraph2 } from '@sberdevices/plasma-tokens';

import { DetailsItemProps, ProductDetailsItem } from './ProductDetailsItem/ProductDetailsItem';

export interface ProductDetailsProps {
    /** Детали (характеристики) товара */
    details: (DetailsItemProps | React.ReactNode)[];
    /** Заголовок */
    title?: React.ReactNode;
    className?: string;
}

const isDetailsItemProps = (detailsItem: DetailsItemProps | React.ReactNode): detailsItem is DetailsItemProps => {
    return typeof detailsItem === 'object' && detailsItem !== null && ('name' in detailsItem || 'value' in detailsItem);
};

const StyledProductDetailsItemContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: 0.75rem;
    }
`;

export const StyledTitle = styled.div`
    ${paragraph2}

    ${mediaQuery(
        'M',
        2,
    )(css`
        ${button2}
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        ${headline3}
    `)}

    margin-bottom: 0.75rem;
`;

/** Компонент для отображения деталей (характеристик) товара */
export const ProductDetails: React.FC<ProductDetailsProps> = ({ className, details, title }) => {
    return (
        <div className={className}>
            {title && <StyledTitle>{title}</StyledTitle>}
            {details.map((detailsItem, index) => (
                <StyledProductDetailsItemContainer key={index}>
                    {isDetailsItemProps(detailsItem) ? <ProductDetailsItem {...detailsItem} /> : detailsItem}
                </StyledProductDetailsItemContainer>
            ))}
        </div>
    );
};
