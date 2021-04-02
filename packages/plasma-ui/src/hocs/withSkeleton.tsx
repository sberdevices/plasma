import React from 'react';
import styled, { css } from 'styled-components';

import { SkeletonProps } from '../components/Skeleton';
import { applySkeletonGradient } from '../mixins';

export interface WithSkeletonProps extends SkeletonProps {}

export const withSkeleton = <P extends WithSkeletonProps>(Component: React.FC<P>) =>
    styled(Component)`
        ${({ skeleton }) =>
            skeleton &&
            css`
                ${applySkeletonGradient({ $lighter: true })}
            `}
    ` as React.FC<P>;
