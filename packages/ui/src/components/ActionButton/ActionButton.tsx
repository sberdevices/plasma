import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

const sizeMap = {
    s: 40,
    m: 56,
    l: 72,
};

type ActionButtonSize = keyof typeof sizeMap;

type ActionButtonColor = keyof DefaultTheme['colors'];

export interface ActionButtonProps {
    size?: ActionButtonSize;
    onClick?: (event: React.SyntheticEvent<HTMLSpanElement>) => void;
    className?: string;
    color?: ActionButtonColor;
}

interface StyledRootProps {
    size: number;
    color: ActionButtonColor;
}

const StyledRoot = styled.span<StyledRootProps>`
    ${({ theme, color, size }) => css`
        align-items: center;
        background-color: ${theme.colors[color]};
        display: flex;
        justify-content: center;
        transition: opacity 0.2s ease-in-out;
        border-radius: 50%;
        border: none;
        height: ${size}px;
        width: ${size}px;
    `}
`;

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    className,
    onClick,
    size = 'm',
    color = 'active',
}) => {
    return (
        <StyledRoot onClick={onClick} className={className} size={sizeMap[size]} color={color}>
            {children}
        </StyledRoot>
    );
};

export default ActionButton;
