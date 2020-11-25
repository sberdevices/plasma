import React from 'react';
import styled from 'styled-components';

const StyledHeaderContent = styled.div`
    margin-left: auto;
`;

export const HeaderContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
    <StyledHeaderContent {...rest}>{children}</StyledHeaderContent>
);
