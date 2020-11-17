import React from 'react';
import styled from 'styled-components';

import { StylingProps } from '../../types/StylingProps';

const StyledHeaderContent = styled.div`
    margin-left: auto;
`;

export const HeaderContent: React.FC<StylingProps> = ({ children, ...rest }) => (
    <StyledHeaderContent {...rest}>{children}</StyledHeaderContent>
);
