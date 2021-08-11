import React from 'react';
import styled from 'styled-components';
import { Price } from '@sberdevices/plasma-web/components/Price';

import { ShowcaseDashedBorder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Content/Price',
    component: Price,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const StyledDashedBorder = styled(ShowcaseDashedBorder)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const Default = () => (
    <StyledDashedBorder>
        <Price currency="rub" minimumFractionDigits={0} style={{ marginRight: '1rem' }}>
            {12345.67}
        </Price>
        <Price currency="rub" stroke minimumFractionDigits={0}>
            {89012.34}
        </Price>
    </StyledDashedBorder>
);
