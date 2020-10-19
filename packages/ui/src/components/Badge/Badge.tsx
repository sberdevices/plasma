import React from 'react';
import styled, { css } from 'styled-components';
import { colors, typography } from 'plasma-tokens';

import { viewToColors } from '../Button/Button';

const fontSize = 12;

export const badgeSizes = {
    s: {
        paddingX: 4 / fontSize,
        paddingCompactX: 2 / fontSize,
    },
    m: {
        paddingX: 6 / fontSize,
        paddingCompactX: 3 / fontSize,
    },
    l: {
        paddingX: 8 / fontSize,
        paddingCompactX: 4 / fontSize,
    },
    xl: {
        paddingX: 12 / fontSize,
        paddingCompactX: 6 / fontSize,
    },
};
export const badgeRootSizes = {
    s: css`
        height: ${16 / fontSize}em;
        min-width: ${16 / fontSize}em;
        border-radius: ${8 / fontSize}em;
    `,
    m: css`
        height: ${22 / fontSize}em;
        min-width: ${22 / fontSize}em;
        border-radius: ${11 / fontSize}em;
    `,
    l: css`
        height: ${24 / fontSize}em;
        min-width: ${24 / fontSize}em;
        border-radius: ${12 / fontSize}em;
    `,
    xl: css`
        height: ${32 / fontSize}em;
        min-width: ${32 / fontSize}em;
        border-radius: ${16 / fontSize}em;
    `,
};
export const badgeViewsToColors = {
    ...viewToColors,
    black: css`
        background-color: ${colors.blackSecondary};
        color: ${colors.text};
    `,
};

export type BadgeView = keyof typeof badgeViewsToColors;
export type BadgeSize = keyof typeof badgeSizes;

interface StyledBadgeProps {
    /**
     * Цвет иконки. Все те же цвета, что и в Button + цвет "Black".
     */
    view: BadgeView;
    /**
     * Размер компонента.
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
    ${({ view }) => badgeViewsToColors[view]};

    ${({ isContentLeft, isText, size }) =>
        isContentLeft && isText &&
        css`
            padding-left: ${badgeSizes[size].paddingX}em;
        `};

    ${({ isContentRight, isText, size }) =>
        isContentRight && isText &&
        css`
            padding-right: ${badgeSizes[size].paddingX}em;
        `};
`;

interface StyledTextProps extends Pick<StyledBadgeProps, 'size' | 'isContentLeft' | 'isContentRight'> {

}

const StyledText = styled.span<StyledTextProps>`
    box-sizing: border-box;

    ${({ size }) =>
        css`
            padding: 0 ${badgeSizes[size].paddingX}em;
        `};

    ${({ isContentLeft, size }) =>
        isContentLeft &&
        css`
            padding-left: ${badgeSizes[size].paddingCompactX}em;
        `};

    ${({ isContentRight, size }) =>
        isContentRight &&
        css`
            padding-right: ${badgeSizes[size].paddingCompactX}em;
        `};
`;

export interface BadgeProps extends Partial<Omit<StyledBadgeProps, 'isText' | 'isContentLeft' | 'isContentRight'>> {
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
}

export const Badge: React.FC<BadgeProps> = ({ text, contentLeft, contentRight, size = 'l', view = 'secondary' }) => (
    <StyledBadge size={size} view={view} isText={!!text} isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
        {contentLeft}
        {text && (
            <StyledText size={size} isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
                {text}
            </StyledText>
        )}
        {contentRight}
    </StyledBadge>
);
