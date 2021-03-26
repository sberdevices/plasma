import React from 'react';
import styled from 'styled-components';

export const StyledHeaderTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;

    flex: 1 1 max-content;
    max-width: max-content;
    min-width: 10%;
`;

/**
 * Обертывающий компонент для заголовка и подзаголовка.
 */
export const HeaderTitleWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
    <StyledHeaderTitleWrapper {...rest}>{children}</StyledHeaderTitleWrapper>
);
