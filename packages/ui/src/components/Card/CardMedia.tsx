import React from 'react';
import styled, { css } from 'styled-components';

interface StyledRootProps {
    $height?: string;
    $disabled?: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
    position: relative;

    display: block;
    box-sizing: border-box;

    width: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.5;
        `}

    ${({ $height }) =>
        $height &&
        css`
            height: ${$height};
        `}
`;

export interface CardMediaProps {
    src: string;
    height?: string;
    disabled?: boolean;
    className?: string;
}

export const CardMedia: React.FC<CardMediaProps> = ({ children, className, src, height, disabled }) => {
    return (
        <StyledRoot
            className={className}
            style={{ backgroundImage: `url('${src}')` }}
            $height={height}
            $disabled={disabled}
        >
            {children}
        </StyledRoot>
    );
};
