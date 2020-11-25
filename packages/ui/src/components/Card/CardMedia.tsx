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

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    height?: string;
    disabled?: boolean;
}

export const CardMedia: React.FC<CardMediaProps> = ({ children, src, height, ...rest }) => {
    return (
        <StyledRoot style={{ backgroundImage: `url('${src}')` }} $height={height} {...rest}>
            {children}
        </StyledRoot>
    );
};
