import React from 'react';
import styled from 'styled-components';

import { StylingProps } from '../../types/StylingProps';

export const StyledHeaderTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
`;

export const HeaderTitleWrapper: React.FC<StylingProps> = ({ children, ...rest }) => (
    <StyledHeaderTitleWrapper {...rest}>{children}</StyledHeaderTitleWrapper>
);
