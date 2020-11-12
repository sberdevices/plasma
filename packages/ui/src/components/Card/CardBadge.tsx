import React from 'react';
import styled from 'styled-components';

import { View } from '../../mixins/applyView';
import { Badge, BadgeSize } from '../Badge';

const StyledRoot = styled(Badge)`
    position: absolute;
`;

export interface CardBadgeProps {
    size?: BadgeSize;
    view?: View;
    className?: string;
}

export const CardBadge: React.FC<CardBadgeProps> = ({ className, children, size, view }) => (
    <StyledRoot view={view} size={size} className={className} text={children as string} />
);
