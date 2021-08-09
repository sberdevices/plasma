import React from 'react';
import styled, { css } from 'styled-components';

import { applySkeletonGradient, SkeletonGradientProps, applyRoundness, RoundnessProps } from '../../mixins';
import * as typography from '../../tokens/typography';

import { TextSizeProps, DEFAULT_TEXT_SIZE, DEFAULT_ROUNDNESS } from './Skeleton';

interface StyledTextSizeProps extends SkeletonGradientProps, RoundnessProps {
    $size: TextSizeProps['size'];
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

/**
 * Размеры компонента задаются с помощью констант и соответствуют размерам [типографических элементов](/?path=/docs/).
 */
export const LineSkeleton: React.FC<LineSkeletonProps & React.HTMLAttributes<HTMLDivElement>> = ({
    size = DEFAULT_TEXT_SIZE,
    roundness = DEFAULT_ROUNDNESS,
    ...rest
}) => (
    <StyledLine $size={size} roundness={roundness} {...rest}>
        <StyledVisibleLine />
    </StyledLine>
);
