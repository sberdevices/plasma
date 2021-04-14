import React from 'react';
import styled, { css } from 'styled-components';
import { typography, scalingPixelBasis } from '@sberdevices/plasma-tokens';
import { views } from '../../mixins';

/**
 * Размеры в ремах.
 */
export const badgeSizes = {
    l: {
        textMarginX: `${4 / scalingPixelBasis}rem`,
        textMarginLeftAfterContent: `${4 / scalingPixelBasis}rem`,
    },
    s: {
        textMarginX: `${2 / scalingPixelBasis}rem`,
        textMarginLeftAfterContent: `${2 / scalingPixelBasis}rem`,
    },
};

export const badgeViews = {
    primary: views.primary,
    secondary: views.overlay,
};

export const badgeRootSizes = {
    l: {
        height: `${24 / scalingPixelBasis}rem`,
        padding: `${4 / scalingPixelBasis}rem`,
        'min-width': `${24 / scalingPixelBasis}rem`,
        'border-radius': `${12 / scalingPixelBasis}rem`,
        'font-size': `${12 / scalingPixelBasis}rem`,
    },
    s: {
        height: `${16 / scalingPixelBasis}rem`,
        padding: `${2 / scalingPixelBasis}rem`,
        'min-width': `${16 / scalingPixelBasis}rem`,
        'padding-left': `${4 / scalingPixelBasis}rem`,
        'border-radius': `${8 / scalingPixelBasis}rem`,
        'font-size': `${10 / scalingPixelBasis}rem`,
    },
};

const StyledText = styled.span``;
const StyledContent = styled.div`
    display: flex;
`;

export type BadgeSize = keyof typeof badgeSizes;
export type BadgeView = keyof typeof badgeViews;

interface StyledBadgeProps {
    /**
     * Размер компонента
     */
    size: BadgeSize;
    /**
     * Вид компонента
     */
    view?: BadgeView;
    /**
     * Компонент примет форму круга с соотношением сторон 1x1
     */
    circled?: boolean;
}

const StyledBadge = styled.div<StyledBadgeProps>`
    ${typography.caption};

    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    width: max-content;

    ${({ view }) => badgeViews[view!]};

    ${({ size, circled }) => css`
        ${badgeRootSizes[size]};
        ${
            circled &&
            css`
                width: ${badgeRootSizes[size]['min-width']};
                padding-left: 0;
                padding-right: 0;
            `
        }

        ${StyledText} {
            margin-left: ${badgeSizes[size].textMarginX};
            margin-right: ${badgeSizes[size].textMarginX};
        }

        ${StyledContent} ~ ${StyledText} {
            margin-left: ${badgeSizes[size].textMarginLeftAfterContent};
        }
    `};
`;

export interface BadgeProps extends StyledBadgeProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Текст для отображения.
     */
    text?: string;
    /**
     * Слот для контента слева от текста.
     */
    contentLeft?: React.ReactElement;
}

/**
 * Небольшая бирка для ячеек и карточек.
 * Компонент может отображаться в нескольких размерах и цветах, может содержать текст и/или иконку.
 */
export const Badge: React.FC<BadgeProps> = ({ size = 'l', view = 'primary', text, contentLeft, ...rest }) => (
    <StyledBadge size={size} view={view} {...rest}>
        {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
        {text && <StyledText>{text}</StyledText>}
    </StyledBadge>
);
