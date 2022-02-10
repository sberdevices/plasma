import React from 'react';
import styled from 'styled-components';
import { secondary } from '@sberdevices/plasma-tokens';

import { Description } from '../../../types';

interface ProductCharacteristicsProps {
    characteristics: Description[];
    className?: string;
}

const StyledProductCharacteristicsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledProductCharacteristicsItem = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    color: ${secondary};
`;

const ProductCharacteristicsItem: React.FC<{ title: string; content: string }> = ({ title, content }) => (
    <StyledProductCharacteristicsItem>
        <span>{title}</span>
        <span>{content}</span>
    </StyledProductCharacteristicsItem>
);

/** @deprecated use ProductDetails */
export const ProductCharacteristics: React.FC<ProductCharacteristicsProps> = ({ characteristics, className }) => (
    <StyledProductCharacteristicsContainer className={className}>
        {characteristics.map(({ title, content }) => (
            <ProductCharacteristicsItem key={title} title={title} content={content} />
        ))}
    </StyledProductCharacteristicsContainer>
);
