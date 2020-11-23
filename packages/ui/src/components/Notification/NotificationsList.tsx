import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const StyledRoot = styled.div`
    position: absolute;
    top: 1.5rem;
    left: calc(50% - 17.75rem);
    z-index: 100;
    height: 100vh;
    width: 35.5rem;

    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
`;

const showAnimation = keyframes`
    0% {
        transform: translateY(-300%);
        opacity: 0;
        max-height: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
        max-height: 10rem;
    }
`;

const hideAnimation = keyframes`
    0% {
        transform: translateX(0);
        opacity: 1;
        max-height: 10rem;
    }

    100% {
        transform: translateX(100%);
        opacity: 0;
        max-height: 0;
    }
`;

const ItemWrapper = styled.div<{ isHiding: boolean }>`
    padding-bottom: 1rem;

    opacity: 1;
    max-height: 10rem;

    ${({ isHiding }) => css`
        animation: 0.4s ${isHiding ? hideAnimation : showAnimation} ease-out;
    `}
`;

export const NotificationsList: React.FC = ({ children }) => {
    const childrenList = (React.Children.map(children, (child) => child) || []) as React.ReactElement[];
    return (
        <StyledRoot>
            {childrenList.map((child) => (
                <ItemWrapper key={child.key as string} isHiding={child.props.isHiding}>
                    {child}
                </ItemWrapper>
            ))}
        </StyledRoot>
    );
};
