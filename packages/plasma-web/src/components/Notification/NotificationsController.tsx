import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useStoreon } from 'storeon/react';

import { NotificationsList } from './NotificationsList';
import { Notification } from './Notification';
import type { NotificationState, NotificationEvents } from './types';

export const NotificationsController: React.FC = () => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const { notifications } = useStoreon<NotificationState, NotificationEvents>('notifications');

    useEffect(() => {
        const root = document.createElement('div');
        rootRef.current = root;
        document.body.appendChild(root);

        return () => {
            document.body.removeChild(root);
        };
    }, []);

    return (
        rootRef &&
        rootRef.current &&
        createPortal(
            <NotificationsList>
                {notifications.map(({ id, ...rest }) => (
                    <Notification key={id} {...rest} />
                ))}
            </NotificationsList>,
            rootRef.current,
        )
    );
};
