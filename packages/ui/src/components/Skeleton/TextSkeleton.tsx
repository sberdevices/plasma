import React from 'react';
import styled from 'styled-components';

import { RoundnessProps } from '../../mixins';

import { TextSizeProps, DEFAULT_TEXT_SIZE } from './Skeleton';
import { LineSkeleton } from './LineSkeleton';

const variousWidth = [7.58, 5.27, 13.54, 6.63, 0.28, 14.8, 0.33, 11.26, 14.1, 10.59, 3.38, 13.5, 7.71, 3.34, 7.96];

const StyledTextSkeleton = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`;

export interface TextSkeletonProps extends TextSizeProps, RoundnessProps {
    /**
     * Количетво линий скелета
     */
    lines: number;
    /**
     * Заданная ширина линий в процентах; по умолчанию подбирается случайная для заданного кол-ва линий
     */
    width?: string | number;
}

export const TextSkeleton: React.FC<TextSkeletonProps & React.HTMLAttributes<HTMLDivElement>> = ({
    lines,
    width,
    roundness,
    size = DEFAULT_TEXT_SIZE,
    ...props
}) => (
    <StyledTextSkeleton {...props}>
        {Array.from(Array(lines), (_, i) => {
            let w;
            if (width) {
                w = width;
            } else {
                switch (true) {
                    // Последняя строка
                    case i === lines - 1 && lines !== 1:
                        w = 45 - variousWidth[i % variousWidth.length];
                        break;
                    // Единственная или первая из двух
                    case lines === 1 || lines === 2:
                        w = 100;
                        break;
                    default:
                        w = 100 - variousWidth[i % variousWidth.length];
                }
            }
            return <LineSkeleton key={`line:${i}`} size={size} roundness={roundness} style={{ width: `${w}%` }} />;
        })}
    </StyledTextSkeleton>
);
