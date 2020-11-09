import React from 'react';
import styled, { css } from 'styled-components';
import { typography, scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { applyView, ViewProps } from '../../mixins/applyView';

export const badgeSizes = {
    s: {
        paddingX: 4 / scalingPixelBasis,
        paddingCompactX: 2 / scalingPixelBasis,
    },
    l: {
        paddingX: 8 / scalingPixelBasis,
        paddingCompactX: 4 / scalingPixelBasis,
    },
};
export const badgeRootSizes = {
    s: css`
        height: ${16 / scalingPixelBasis}rem;
        min-width: ${16 / scalingPixelBasis}rem;
        border-radius: ${8 / scalingPixelBasis}rem;
        font-size: ${10 / scalingPixelBasis}rem;
    `,
    l: css`
        height: ${24 / scalingPixelBasis}rem;
        min-width: ${24 / scalingPixelBasis}rem;
        border-radius: ${12 / scalingPixelBasis}rem;
        font-size: ${12 / scalingPixelBasis}rem;
    `,
};

export type BadgeSize = keyof typeof badgeSizes;

interface StyledBadgeProps extends ViewProps {
    /**
     * Размер компонента
     */
    size: BadgeSize;
    isText?: boolean;
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

const StyledBadge = styled.div<StyledBadgeProps>`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    ${typography.caption};

    ${({ size }) => badgeRootSizes[size]};
    ${applyView};

    ${({ isContentLeft, isText, size }) =>
        isContentLeft &&
        isText &&
        css`
            padding-left: ${badgeSizes[size].paddingX}em;
        `};

    ${({ isContentRight, isText, size }) =>
        isContentRight &&
        isText &&
        css`
            padding-right: ${badgeSizes[size].paddingX}em;
        `};
`;

type StyledTextProps = Pick<StyledBadgeProps, 'size' | 'isContentLeft' | 'isContentRight'>;

const StyledText = styled.span<StyledTextProps>`
    box-sizing: border-box;

    ${({ size }) =>
        css`
            padding: 0 ${badgeSizes[size].paddingX}rem;
        `};

    ${({ isContentLeft, size }) =>
        isContentLeft &&
        css`
            padding-left: ${badgeSizes[size].paddingCompactX}rem;
        `};

    ${({ isContentRight, size }) =>
        isContentRight &&
        css`
            padding-right: ${badgeSizes[size].paddingCompactX}rem;
        `};
`;

export interface BadgeProps
    extends Partial<Omit<StyledBadgeProps, 'isText' | 'isContentLeft' | 'isContentRight'>>,
        React.HTMLAttributes<HTMLDivElement> {
    /**
     * Текст для отображения.
     */
    text?: string;
    /**
     * Слот для контента слева от текста.
     */
    contentLeft?: React.ReactElement;
    /**
     * Слот для контента справа от текста.
     */
    contentRight?: React.ReactElement;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    text,
    contentLeft,
    contentRight,
    className,
    style,
    size = 'l',
    view = 'secondary',
}) => (
    <StyledBadge
        size={size}
        view={view}
        className={className}
        style={style}
        isText={!!text}
        isContentLeft={!!contentLeft}
        isContentRight={!!contentRight}
    >
        {contentLeft}
        {text && (
            <StyledText size={size} isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
                {text}
            </StyledText>
        )}
        {contentRight}
    </StyledBadge>
);
