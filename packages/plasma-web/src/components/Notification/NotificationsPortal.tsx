import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { useStoreon } from 'storeon/react';

import { Notification } from './Notification';
import type { NotificationsState, NotificationsEvents } from './NotificationsStore';

const showAnimation = keyframes`
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;
const hideAnimation = keyframes`
    0% {
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const StyledRoot = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;

    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    box-sizing: border-box;

    padding: 0 1.5rem 1.5rem;
    max-height: 100%;
`;
const StyledItemWrapper = styled.div<{ isHiding: boolean }>`
    margin-top: 1rem;
    opacity: 1;

    ${({ isHiding }) => css`
        animation: 0.4s ${isHiding ? hideAnimation : showAnimation} ease-out;
    `}
`;

/**
 * Обертка для визуального представления уведомлений.
 */
export const NotificationsPortal: React.FC = () => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const { notifications } = useStoreon<NotificationsState, NotificationsEvents>('notifications');

    React.useEffect(() => {
        const root = document.createElement('div');
        rootRef.current = root;
        rootRef.current.setAttribute('id', 'plasma-notifications-root');
        rootRef.current.style.position = 'relative';
        rootRef.current.style.zIndex = '9100';
        document.body.appendChild(root);

        return () => {
            document.body.removeChild(root);
        };
    }, []);

    return (
        rootRef &&
        rootRef.current &&
        ReactDOM.createPortal(
            <>
                {notifications.length > 0 && (
                    <StyledRoot>
                        {notifications.map(({ id, ...rest }) => (
                            <Notification key={id} as={StyledItemWrapper} id={id} {...rest} />
                        ))}
                    </StyledRoot>
                )}
            </>,
            rootRef.current,
        )
    );
};
