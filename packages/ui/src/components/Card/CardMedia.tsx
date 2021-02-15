import React from 'react';
import styled, { css } from 'styled-components';

import { Image, ImageProps } from '../Image';

export type CardMediaProps = ImageProps & {
    disabled?: boolean;
};

const StyledImage = styled(Image)<{ $disabled?: boolean }>`
    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.5;
        `}
`;

/**
 * Компонент для отображения картинок.
 */
export const CardMedia: React.FC<CardMediaProps> = ({ disabled, ...props }) => (
    <StyledImage $disabled={disabled} {...props} />
);
