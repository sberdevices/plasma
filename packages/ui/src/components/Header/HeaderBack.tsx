import React from 'react';
import styled from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';
import { IconChevronLeft, IconSize } from '@sberdevices/plasma-icons';

import { ButtonProps } from '../Button';

import { HeaderButton } from './HeaderButton';

export const StyledHeaderBackButton = styled(HeaderButton)`
    position: absolute;
    left: calc(var(--plasma-grid-margin) * -1 + ${16 / scalingPixelBasis}rem);
`;

export type HeaderBackProps = ButtonProps & {
    iconSize?: IconSize;
};

export const HeaderBack: React.FC<HeaderBackProps> = ({ iconSize = 's', ...rest }) => (
    <StyledHeaderBackButton {...rest}>
        <IconChevronLeft size={iconSize} />
    </StyledHeaderBackButton>
);
