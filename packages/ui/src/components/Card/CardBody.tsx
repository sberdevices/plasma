import React from 'react';
import styled from 'styled-components';

const StyledCardBody = styled.div`
    position: relative;

    display: flex;
    overflow: hidden;
    flex: 1;
    flex-direction: column;

    box-sizing: content-box;
    width: 100%;

    border-radius: inherit;
`;

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Используется для скругления рамок содержимого внутри Card.
 */
export const CardBody: React.FC<CardBodyProps> = ({ children, className, ...rest }) => {
    return (
        <StyledCardBody {...rest} className={className}>
            {children}
        </StyledCardBody>
    );
};
