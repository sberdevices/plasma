import React from 'react';
import styled from 'styled-components';

const StyledHeaderContent = styled.div`
    flex: 1 0 max-content;
    margin-left: auto;
    padding-left: 0.75rem;
`;

/**
 * Контейнер для контента шапки.
 */
export const HeaderContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
    <StyledHeaderContent {...rest}>{children}</StyledHeaderContent>
);
