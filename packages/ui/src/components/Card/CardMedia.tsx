import React from 'react';
import styled, { css } from 'styled-components';

export interface CardMediaProps {
    src: string;
    disabled?: boolean;
    className?: string;
}

const StyledRoot = styled.div<CardMediaProps>`
    background-image: url('${({ src }) => src}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: block;
    position: relative;
    height: 392px;
    width: 100%;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}
`;

export const CardMedia: React.FC<CardMediaProps> = ({ children, className, disabled, src }) => {
    return (
        <StyledRoot src={src} disabled={disabled} className={className}>
            {children}
        </StyledRoot>
    );
};

export default CardMedia;
