import styled, { css } from 'styled-components';
import { Badge as BaseBadge, BadgeProps as BaseProps } from '@sberdevices/plasma-core/components/Badge';

export const badgeViews = {
    primary: css`
        color: #226af1;
        background-color: #f0f5fe;
    `,
    secondary: css`
        color: #080808;
        background-color: rgba(0, 0, 0, 0.05);
    `,
    success: css`
        color: #09a552;
        background-color: rgba(9, 165, 82, 0.08);
    `,
    warning: css`
        color: #ee6820;
        background-color: #fdf1eb;
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
