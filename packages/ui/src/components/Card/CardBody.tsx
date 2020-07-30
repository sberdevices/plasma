import React from 'react';
import styled from 'styled-components';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const StyledRoot = styled.div`
    position: relative;

    display: flex;
    overflow: hidden;
    flex: 1;
    flex-direction: column;

    box-sizing: content-box;
    width: 100%;

    border-radius: 40px;
`;

export const CardBody: React.FC<CardBodyProps> = ({ children, className, ...attributes }) => {
    return (
        <StyledRoot {...attributes} className={className}>
            {children}
        </StyledRoot>
    );
};
