import React from 'react';
import styled from 'styled-components';

import { Icon } from '../Icon/Icon';
import { IconSize } from '../Icon/IconRoot';

import { HeaderButton } from './HeaderButton';

export const StyledHeaderBackButton = styled(HeaderButton)`
    position: absolute;
    left: -2.25rem;
`;

export const HeaderBack: React.FC<{ size?: IconSize }> = ({ size = 's' }) => (
    <StyledHeaderBackButton>
        <Icon size={size} icon="chevronLeft" />
    </StyledHeaderBackButton>
);
