import React from 'react';
import styled from 'styled-components';

import { PickOptional } from '../../types';
import { Button, ButtonProps } from '../Button/Button';

const StyledHeaderButton = styled(Button)`
    /**
    * Сброс для совместимости с предыдущей версией компонента.
    */
    height: auto;
    padding: 0;
`;

export interface HeaderButtonProps
    extends PickOptional<ButtonProps, 'as' | 'size' | 'scaleOnInteraction' | 'disabled'>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Кнопка без внутренних отступов, границ и цвета фона.
 */
export const HeaderButton: React.FC<HeaderButtonProps> = ({ size = 'm', children, ...rest }) => {
    return (
        <StyledHeaderButton size={size} view="clear" outlined={false} {...rest}>
            {children}
        </StyledHeaderButton>
    );
};
