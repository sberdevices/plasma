import { createStoreon, StoreonModule, StoreonDispatch } from 'storeon';

import type { InputNotification, NotificationState, NotificationEvents } from './types';

const notificationsController: StoreonModule<NotificationState, NotificationEvents> = (store) => {
    store.on('@init', () => ({ notifications: [] }));

    store.on('add', ({ notifications }, notification) => {
        return { notifications: notifications.concat([notification]) };
    });

    store.on('hide', ({ notifications }, id) => {
        return { notifications: notifications.map((item) => (id === item.id ? { ...item, isHiding: true } : item)) };
    });

    store.on('remove', ({ notifications }, id) => {
        return { notifications: notifications.filter((item) => id !== item.id) };
    });
};

export const notificationsStore = createStoreon([notificationsController]);

const delay = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const removeNotification = async (dispatch: StoreonDispatch<NotificationEvents>, id: string) => {
    dispatch('hide', id);
    await delay(380);
    dispatch('remove', id);
};

/**
 * Добавить сообщение в стек уведомлений.
 */
export const addNotification = async (notification: InputNotification) => {
    const id = String(Date.now());
    const timeout = notification.timeout || 2000;
    const { dispatch } = notificationsStore;

    dispatch('add', { ...notification, id, isHiding: false });

    await delay(timeout);

    await removeNotification(dispatch, id);
};
