import React from 'react';
import styled from 'styled-components';

export interface ToastBodyProps {
    left?: React.ReactNode;
}

const StyledLeftSide = styled.span`
    display: flex;
    margin-right: 0.5rem;
`;

export const ToastBody: React.FC<ToastBodyProps> = ({ left, children }) => (
    <>
        {left && <StyledLeftSide>{left}</StyledLeftSide>}
        {children}
    </>
);
