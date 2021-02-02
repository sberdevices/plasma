import React from 'react';
import styled, { css } from 'styled-components';

import { Image, ImageProps } from '../Image';

export type CardMediaProps = ImageProps & {
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

/**
 * Компонент для отображения картинок.
 */
export const CardMedia: React.FC<CardMediaProps> = ({ disabled, placeholder, style, ...props }) => (
    <StyledImage $disabled={disabled} style={{ ...style, backgroundImage: `url('${placeholder}')` }} {...props} />
);
