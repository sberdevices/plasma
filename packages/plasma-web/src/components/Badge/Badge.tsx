import styled, { css } from 'styled-components';
import { Badge as BaseBadge, BadgeProps as BaseProps } from '@sberdevices/plasma-core/components/Badge';
import { surfaceLiquid02, text } from '@sberdevices/plasma-tokens-web';

export const badgeViews = {
    primary: css`
        color: #226af1;
        background-color: rgba(34, 106, 241, 0.09);
    `,
    secondary: css`
        color: ${text};
        background-color: ${surfaceLiquid02};
    `,
    success: css`
        color: #09a552;
        background-color: rgba(9, 165, 82, 0.08);
    `,
    warning: css`
        color: #ee6820;
        background-color: rgba(238, 104, 32, 0.08);
    `,
    critical: css`
        color: #df2638;
        background-color: rgba(223, 38, 56, 0.09);
    `,
};

export type BadgeView = keyof typeof badgeViews;
export interface BadgeProps extends BaseProps {
    /**
     * Вид компонента
     */
    view?: BadgeView;
}

/**
 * Небольшая бирка для ячеек и карточек.
 * Компонент может отображаться в нескольких размерах и цветах, может содержать текст и/или иконку.
 */
export const Badge = styled(BaseBadge)<BadgeProps>`
    && {
        border-radius: 0.25rem;

        ${({ view = 'primary' }) => badgeViews[view]}
    }
`;
