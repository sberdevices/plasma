import React from 'react';
import styled, { css } from 'styled-components';

const sizeMap = {
    small: 40,
    medium: 56,
    large: 72,
} as const;

type ActionButtonSize = keyof typeof sizeMap;

interface ActionButtonProps {
    color: string;
    size?: ActionButtonSize;
    onClick?: (event: React.SyntheticEvent<HTMLSpanElement>) => void;
    className?: string;
}

const StyledButton = styled.span<{ color: string; size: number }>`
    align-items: center;
    background-color: ${(props) => props.color};
    display: flex;
    justify-content: center;
    transition: opacity 0.2s ease-in-out;
    border-radius: 50%;
    border: none;

    ${({ size }) => css`
        height: ${size}px;
        width: ${size}px;
    `}
`;

export const ActionButton: React.FC<ActionButtonProps> = ({ children, className, color, onClick, size = 'medium' }) => {
    return (
        <StyledButton onClick={onClick} color={color} className={className} size={sizeMap[size]}>
            {children}
        </StyledButton>
    );
};

export default ActionButton;
