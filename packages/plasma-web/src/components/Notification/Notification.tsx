import React from 'react';
import styled, { css } from 'styled-components';
import { secondary } from '@sberdevices/plasma-tokens-web';

import { Headline5, Footnote1 } from '../Typography';
import { Badge } from '../Badge';

const statuses = {
    success: css`
        color: #09a552;
    `,
    warning: css`
        color: #ee6820;
    `,
    error: css`
        color: #df2638;
    `,
};

export interface NotificationProps {
    /**
     * Заголовок.
     */
    title?: string;
    /**
     * Текст сообщения.
     */
    text?: string;
    /**
     * Статус - цветовая индикация сообщения.
     */
    status?: keyof typeof statuses;
    /**
     * Текст бейджа (если не указан - бейдж не выведется).
     */
    badgeText?: string;
}

const StyledRoot = styled.div`
    position: relative;

    padding: 1rem 1.25rem;

    background: #fff;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 4px 14px rgba(0, 0, 0, 0.08);
    border-radius: 0.5rem;
`;
const StyledTitle = styled(Headline5)<Pick<NotificationProps, 'status'>>`
    margin-bottom: 0.5rem;

    ${({ status }) => status && statuses[status]}
`;
const StyledText = styled(Footnote1)`
    color: ${secondary};
`;
const StyledBadge = styled(Badge)`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    && {
        border-radius: 50%;
    }
`;

/**
 * Уведомление.
 */
export const Notification: React.FC<NotificationProps> = ({ status, title, text, badgeText }) => {
    return (
        <StyledRoot>
            <StyledTitle status={status}>{title}</StyledTitle>
            <StyledText>{text}</StyledText>
            {badgeText && <StyledBadge text={badgeText} size="l" view="secondary" circled />}
        </StyledRoot>
    );
};
