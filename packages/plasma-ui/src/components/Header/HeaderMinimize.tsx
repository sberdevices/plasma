import React from 'react';
import { IconChevronDown } from '@sberdevices/plasma-icons';

import { HeaderBackProps, StyledHeaderBackButton } from './HeaderBack';

export interface HeaderMinimizeProps extends HeaderBackProps {}

/**
 * Кнопка свернуть.
 */
export const HeaderMinimize: React.FC<HeaderMinimizeProps> = ({ iconSize = 's', ...rest }) => (
    <StyledHeaderBackButton size="s" square view="clear" {...rest}>
        <IconChevronDown size={iconSize} />
    </StyledHeaderBackButton>
);
