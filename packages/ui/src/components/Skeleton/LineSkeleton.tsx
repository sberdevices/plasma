import React from 'react';
import styled, { css } from 'styled-components';
import { typography } from '@sberdevices/plasma-tokens';

import { applyRoundness, RoundnessProps, applySkeletonGradient } from '../../mixins';

import { TextSizeProps, DEFAULT_TEXT_SIZE, DEFAULT_ROUNDNESS } from './Skeleton';

interface StyledTextSizeProps extends RoundnessProps {
    $size: TextSizeProps['size'];
    $lighter?: boolean; // Для совместимости тайпингов InterpolationFunction props
}

const StyledVisibleLine = styled.div`
    position: relative;
    overflow: hidden;

    width: 100%;
`;

const StyledLine = styled.div<StyledTextSizeProps>`
    display: flex;
    align-items: center;

    width: 100%;

    ${({ $size }) => css`
        height: ${typography[$size].lineHeight};

        & ${StyledVisibleLine} {
            height: ${typography[$size].fontSize};
        }
    `}

    & ${StyledVisibleLine} {
        ${applyRoundness}
        ${applySkeletonGradient}
    }
`;

export interface LineSkeletonProps extends TextSizeProps, Partial<RoundnessProps> {}

export const LineSkeleton: React.FC<LineSkeletonProps & React.HTMLAttributes<HTMLDivElement>> = ({
    size = DEFAULT_TEXT_SIZE,
    roundness = DEFAULT_ROUNDNESS,
    ...rest
}) => (
    <StyledLine $size={size} roundness={roundness} {...rest}>
        <StyledVisibleLine />
    </StyledLine>
);
