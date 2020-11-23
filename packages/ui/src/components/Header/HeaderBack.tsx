import React from 'react';
import styled from 'styled-components';
import { IconChevronLeft, IconSize } from '@sberdevices/plasma-icons';

import { HeaderButton } from './HeaderButton';

export const StyledHeaderBackButton = styled(HeaderButton)`
    position: absolute;
    left: -2.25rem;
`;

export const HeaderBack: React.FC<{ size?: IconSize }> = ({ size = 's' }) => (
    <StyledHeaderBackButton>
        <IconChevronLeft size={size} />
    </StyledHeaderBackButton>
);
