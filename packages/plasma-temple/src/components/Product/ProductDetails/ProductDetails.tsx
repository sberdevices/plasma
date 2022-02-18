import React from 'react';
import styled from 'styled-components';
import { detectDevice, DeviceKind, Headline3, Button2, ParagraphText2 } from '@sberdevices/plasma-ui';

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

const mapDeviceToTitle: Record<DeviceKind, React.FC> = {
    sberBox: ParagraphText2,
    sberPortal: Button2,
    mobile: Headline3,
};

export const StyledTitle = styled(mapDeviceToTitle[detectDevice()])`
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
