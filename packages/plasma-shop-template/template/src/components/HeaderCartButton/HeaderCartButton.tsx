import React from 'react';
import styled from 'styled-components';
import { CartButton } from '@sberdevices/plasma-temple';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

export const HeaderCartButton: React.FC = () => (
    <StyledWrapper>
        <CartButton screen="cart" />
    </StyledWrapper>
);
