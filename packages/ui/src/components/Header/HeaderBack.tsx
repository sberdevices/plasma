import React from 'react';
import styled from 'styled-components';
import { IconChevronLeft, IconSize } from '@sberdevices/plasma-icons';

import { ButtonProps } from '../Button';

import { HeaderButton } from './HeaderButton';

export const StyledHeaderBackButton = styled(HeaderButton)`
    position: absolute;
    left: -2.25rem;
`;

export interface HeaderBackProps extends ButtonProps {
    iconSize?: IconSize;
}

export const HeaderBack: React.FC<HeaderBackProps> = ({ iconSize = 's', ...rest }) => (
    <StyledHeaderBackButton {...rest}>
        <IconChevronLeft size={iconSize} />
    </StyledHeaderBackButton>
);
