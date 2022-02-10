import React from 'react';
import styled from 'styled-components';
import { Footnote1, Headline2, TextBox } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { ProductTitleProps } from './types';

const StyledSubtitle = styled(Footnote1)`
    color: ${secondary};
`;

export const ProductTitleMobile: React.FC<ProductTitleProps> = ({ title, subtitle, ...rest }) => (
    <TextBox {...rest}>
        <Headline2 breakWord={false}>{title}</Headline2>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
    </TextBox>
);
