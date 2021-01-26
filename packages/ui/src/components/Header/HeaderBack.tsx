import React from 'react';
import styled from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';
import { IconChevronLeft, IconSize } from '@sberdevices/plasma-icons';

import { HeaderButton, HeaderButtonProps } from './HeaderButton';

export const StyledHeaderBackButton = styled.div`
    position: absolute;
    left: calc(var(--plasma-grid-margin) * -1 + ${16 / scalingPixelBasis}rem);
`;

export interface HeaderBackProps extends Omit<HeaderButtonProps, 'as'> {
    iconSize?: IconSize;
}

/**
 * Кнопка назад.
 */
export const HeaderBack: React.FC<HeaderBackProps> = ({ iconSize = 's', ...rest }) => (
    <HeaderButton as={StyledHeaderBackButton} {...rest}>
        <IconChevronLeft size={iconSize} />
    </HeaderButton>
);
