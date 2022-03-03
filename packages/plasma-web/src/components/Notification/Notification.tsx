import React from 'react';
import styled, { css } from 'styled-components';
import { surfaceCard, secondary, warning, critical, footnote1 } from '@sberdevices/plasma-core';
import type { AsProps } from '@sberdevices/plasma-core';

import { Headline5 } from '../Typography';

const statuses = {
    success: css`
        color: #09a552;
    `,
    warning: css`
        color: ${warning};
    `,
    error: css`
        color: ${critical};
    `,
};

export interface NotificationProps extends AsProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Заголовок.
     */
    title?: string;
    /**
     * Контент.
     */
    children?: React.ReactNode;
    /**
     * Статус - цветовая индикация сообщения.
     */
    status?: keyof typeof statuses;
}

const StyledRoot = styled.div`
    position: relative;

    box-sizing: border-box;

    width: 100%;
    max-width: 18.75rem;
    padding: 1rem 1.25rem;

    background: ${surfaceCard};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 4px 14px rgba(0, 0, 0, 0.08);
    border-radius: 0.5rem;
`;
const StyledTitle = styled(Headline5)<Pick<NotificationProps, 'status'>>`
    margin-bottom: 0.5rem;

    ${({ status }) => status && statuses[status]}
`;
const StyledContent = styled.div`
    ${footnote1};
    color: ${secondary};
`;

/**
 * Компонент для небольших уведомлений пользователя
 */
export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
    ({ role = 'status', status, title, children: content, ...rest }, ref) => {
        let ariaLive: 'assertive' | 'polite' = 'polite';
        let ariaAtomic = false;

        if (role === 'alert') {
            ariaLive = 'assertive';
        } else if (role === 'status') {
            ariaAtomic = true;
        }

        return (
            <StyledRoot ref={ref} role={role} aria-live={ariaLive} aria-atomic={ariaAtomic} {...rest}>
                <StyledTitle status={status}>{title}</StyledTitle>
                <StyledContent>{content}</StyledContent>
            </StyledRoot>
        );
    },
);
