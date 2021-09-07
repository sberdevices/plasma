import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { Image, ImageBaseProps } from '../Image';

export type CardMediaProps = ImageBaseProps & {
    disabled?: boolean;
    placeholder?: string;
};

const StyledImage = styled(Image)<{ $disabled?: boolean }>`
    background-size: cover;
    transition: all 1s ease;
    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.5;
        `}
`;

const StyledRoot = styled.div`
    position: relative;
`;

/**
 * Компонент для отображения картинок.
 */
export const CardMedia: React.FC<CardMediaProps> = ({
    disabled,
    placeholder,
    style,
    children,
    className,
    ...props
}) => {
    const imgStyle: React.CSSProperties = { ...style };
    const el = document.querySelector('.doc');
    if (props.src) {
        el?.setAttribute('style', 'opacity: 1');
    }

    if (placeholder && !props.src) {
        imgStyle.backgroundImage = `url('${placeholder}')`;
    }

    return (
        <StyledRoot className={className}>
            <StyledImage $disabled={disabled} style={imgStyle} {...props} className="doc" />
            {children}
        </StyledRoot>
    );
};
