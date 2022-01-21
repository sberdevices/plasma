import React, { FC } from 'react';
import { Headline4 } from '@sberdevices/plasma-web';

import { StyledHeader, StyledIcon } from './Header.style';

/**
 * Заголовок окна плагина.
 */
export const Header: FC = () => (
    <StyledHeader>
        <StyledIcon />
        <Headline4> / ICON EXPORTER</Headline4>
    </StyledHeader>
);
