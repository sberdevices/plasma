import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const showAnimation = keyframes`
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;
const hideAnimation = keyframes`
    0% {
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const StyledItem = styled.div<{ isHiding: boolean }>`
    margin-top: 1rem;
    opacity: 1;

    ${({ isHiding }) => css`
        animation: 0.4s ${isHiding ? hideAnimation : showAnimation} ease-out;
    `}
`;
const StyledRoot = styled.div`
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;

    display: flex;
    flex-direction: column-reverse;
`;

/**
 * Обертка для визуального представления уведомлений.
 */
export const NotificationsList: React.FC = ({ children }) => {
    const childrenList = (React.Children.map(children, (child) => child) || []) as React.ReactElement[];
    return (
        <StyledRoot>
            {childrenList.map((child) => (
                <StyledItem key={child.key as string} isHiding={child.props.isHiding}>
                    {child}
                </StyledItem>
            ))}
        </StyledRoot>
    );
};
