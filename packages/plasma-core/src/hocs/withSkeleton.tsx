import React from 'react';
import styled from 'styled-components';

import { applySkeletonGradient } from '../mixins';

export interface WithSkeletonProps {
    /**
     * Применить скелетон
     */
    skeleton?: boolean;
}

/**
 * Делает компонент скелетоном - у него заменяется фоновый цвет,
 * добавляется градиент и текст становится на 100% прозрачным.
 */
export const withSkeleton = <P extends WithSkeletonProps>(Component: React.FC<P>) =>
    styled(Component)`
        ${({ skeleton }) => skeleton && applySkeletonGradient({ lighter: true })}
    ` as React.FC<P>;
