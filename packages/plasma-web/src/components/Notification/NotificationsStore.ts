import { createStoreon, StoreonStore } from 'storeon';

import { NotificationProps } from './Notification';

export type NotificationItem = {
    id: string;
    isHiding?: boolean;
};
export type NotificationsState = {
    notifications: NotificationItem[];
};
export type NotificationsEvents = {
    add: NotificationItem;
    hide: string;
    remove: string;
};

/**
 * Создает хранилищие с ключем `notifications` к массиву с окнами.
 */
export const NotificationsStore = createStoreon([
    (store: StoreonStore<NotificationsState, NotificationsEvents>) => {
        store.on('@init', () => ({ notifications: [] }));

        store.on('add', ({ notifications }, notif) => {
            return { notifications: notifications.concat([notif]) };
        });

        store.on('hide', ({ notifications }, id) => {
            return {
                notifications: notifications.map((notif) => (id === notif.id ? { ...notif, isHiding: true } : notif)),
            };
        });

        store.on('remove', ({ notifications }, id) => {
            return { notifications: notifications.filter((notif) => id !== notif.id) };
        });
    },
]);

export const closeNotification = (id: string, delay = 380) => {
    const { dispatch } = NotificationsStore;

    dispatch('hide', id);
    setTimeout(() => dispatch('remove', id), delay);
};

/**
 * Открыть новое окно.
 * @param props Пропсы всплывающего окна
 * @return Идентификатор нового окна
 */
export function addNotification({ id: externalId, ...rest }: NotificationProps, timeout = 2000) {
    const id = externalId || `plasma-notification-${Date.now()}`;
    const { dispatch } = NotificationsStore;

    dispatch('add', {
        ...rest,
        id,
        isHiding: false,
    });

    setTimeout(() => closeNotification(id), timeout);

    return id;
}
