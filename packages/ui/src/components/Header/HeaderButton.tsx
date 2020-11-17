import React from 'react';
import styled from 'styled-components';

import { Button, ButtonProps } from '../Button/Button';

const StyledHeaderButton = styled(Button)`
    /**
    * Сброс для совместимости с предыдущей версией компонента.
    */
    height: auto;
    padding: 0;
`;

export const HeaderButton: React.FC<ButtonProps> = ({
    size = 'm',
    view = 'clear',
    outlined = false,
    children,
    ...rest
}) => {
    return (
        <StyledHeaderButton size={size} view={view} outlined={outlined} {...rest}>
            {children}
        </StyledHeaderButton>
    );
};
