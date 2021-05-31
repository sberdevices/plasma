import React from 'react';
import styled, { css } from 'styled-components';

import { caption } from '../../tokens';

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

export const badgeRootSizes = {
    l: {
        height: '1.5rem',
        padding: '0.25rem',
        minWidth: '1.5rem',
        borderRadius: '0.75rem',
        fontSize: '0.75rem',
    },
    s: {
        height: '1rem',
        padding: '0.125rem',
        minWidth: '1rem',
        borderRadius: '0.5rem',
        fontSize: '0.625rem',
    },
};

const StyledText = styled.span``;
const StyledContent = styled.div`
    display: flex;
`;

export type BadgeSize = keyof typeof badgeSizes;

interface StyledBadgeProps {
    /**
     * Размер компонента
     */
    size: BadgeSize;
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

    ${({ size, circled }) => css`
        ${badgeRootSizes[size]};
        ${
            circled &&
            css`
                width: ${badgeRootSizes[size].minWidth};
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
export const Badge: React.FC<BadgeProps> = ({ size = 'l', text, contentLeft, ...rest }) => (
    <StyledBadge size={size} {...rest}>
        {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
        {text && <StyledText>{text}</StyledText>}
    </StyledBadge>
);
