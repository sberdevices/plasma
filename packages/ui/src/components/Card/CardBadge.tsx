import React from 'react';
import styled, { css } from 'styled-components';
import { blackSecondary, whiteSecondary } from '@sberdevices/plasma-tokens';

import { Badge, BadgeSize, BadgeView } from '../Badge/Badge';

// https://github.com/sberdevices/plasma/issues/12
export const colorsToViews = {
    active: 'primary',
    highlight: 'primary',
    blank: 'checked',
    accent: 'warning',
    index: 'secondary',
};

type CompatColor = keyof typeof colorsToViews;

const StyledRoot = styled(Badge)`
    position: absolute;

    ${({ view }) =>
        view === 'secondary' &&
        css`
            background-color: ${blackSecondary};
            color: ${whiteSecondary};
        `}
`;

export interface CardBadgeProps {
    size?: BadgeSize;
    view?: BadgeView;
    color?: CompatColor;
    className?: string;
}

export const CardBadge: React.FC<CardBadgeProps> = ({ className, children, size, view, color = 'active' }) => (
    <StyledRoot
        view={view || (colorsToViews[color] as BadgeView)}
        size={size}
        className={className}
        text={children as string}
    />
);
