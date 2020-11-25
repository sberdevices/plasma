import React from 'react';
import styled from 'styled-components';

export const StyledHeaderTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
`;

export const HeaderTitleWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
    <StyledHeaderTitleWrapper {...rest}>{children}</StyledHeaderTitleWrapper>
);
