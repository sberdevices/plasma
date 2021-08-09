import React from 'react';
import styled, { css } from 'styled-components';

import { applySkeletonGradient, SkeletonGradientProps, applyRoundness, RoundnessProps } from '../../mixins';

import { DEFAULT_ROUNDNESS } from './Skeleton';

interface StyledRectSizeProps extends SkeletonGradientProps, RoundnessProps {
    $width: string;
    $height: string;
}

const StyledRectSkeleton = styled.div<StyledRectSizeProps>`
    ${applyRoundness};
    ${applySkeletonGradient};

    position: relative;
    overflow: hidden;

    ${({ $width, $height }) => css`
        width: ${$width};
        height: ${$height};
    `}
`;

export interface RectSkeletonProps extends Partial<RoundnessProps> {
    width: string | number;
    height: string | number;
}

/**
 * Компонент для создания прямоугольного плейсхолдера.
 */
export const RectSkeleton: React.FC<RectSkeletonProps & React.HTMLAttributes<HTMLDivElement>> = ({
    width,
    height,
    roundness = DEFAULT_ROUNDNESS,
    ...rest
}) => (
    <StyledRectSkeleton
        $width={typeof width === 'string' ? width : `${width}px`}
        $height={typeof height === 'string' ? height : `${height}px`}
        roundness={roundness}
        {...rest}
    />
);
