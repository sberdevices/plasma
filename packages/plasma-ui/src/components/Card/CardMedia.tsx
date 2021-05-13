import React from 'react';
import styled, { css } from 'styled-components';

import { Image, ImageBaseProps } from '../Image';

export type CardMediaProps = ImageBaseProps & {
    disabled?: boolean;
    placeholder?: string;
};

const StyledImage = styled(Image)<{ $disabled?: boolean }>`
    background-size: cover;

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

    if (placeholder && !props.src) {
        imgStyle.backgroundImage = `url('${placeholder}')`;
    }

    return (
        <StyledRoot className={className}>
            <StyledImage $disabled={disabled} style={imgStyle} {...props} />
            {children}
        </StyledRoot>
    );
};
