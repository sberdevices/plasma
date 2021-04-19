import React from 'react';
import styled, { css } from 'styled-components';

import { caption } from '../../tokens/typography';
import { views } from '../../mixins';

/**
 * Размеры в ремах.
 */
export const badgeSizes = {
    l: {
        textMarginX: '0.25rem',
        textMarginLeftAfterContent: '0.25rem',
    },
    s: {
        textMarginX: '0.125rem',
        textMarginLeftAfterContent: '0.125rem',
    },
};

export const badgeViews = {
    primary: views.primary,
    secondary: views.overlay,
};

export const badgeRootSizes = {
    l: {
        height: '1.5rem',
        padding: '0.25rem',
        'min-width': '1.5rem',
        'border-radius': '0.75rem',
        'font-size': '0.75rem',
    },
    s: {
        height: '1rem',
        padding: '0.125rem',
        'min-width': '1rem',
        'border-radius': '0.5rem',
        'font-size': '0.625rem',
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
    ${caption};

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
