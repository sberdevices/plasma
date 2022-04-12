import React from 'react';
import styled from 'styled-components';

import { ItemBackgroundProps } from './ItemBackground@common';

const StyledImageContainer = styled.div`
    height: 100vw;
    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
    /* stylelint-disable */
    mask-image: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.78) 50%, rgba(255, 255, 255, 0) 100%);
    /* stylelint-enable */
`;

const StyledImage = styled.img`
    height: 100vw;
    width: 100vw;
    object-fit: cover;
`;

export const ItemBackgroundMobile: React.FC<ItemBackgroundProps> = ({ src }) => (
    <StyledImageContainer>
        <StyledImage src={src} data-cy="background-image" />
    </StyledImageContainer>
);
