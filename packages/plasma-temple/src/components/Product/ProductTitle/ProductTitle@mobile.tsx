import React from 'react';
import styled from 'styled-components';
import { Footnote1, Headline2, TextBox } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { ProductTitleProps } from './types';

const StyledSubtitle = styled(Footnote1)`
    color: ${secondary};
`;

export const ProductTitleMobile: React.FC<ProductTitleProps> = ({ title, subtitle }) => (
    <TextBox>
        <Headline2>{title}</Headline2>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
    </TextBox>
);
