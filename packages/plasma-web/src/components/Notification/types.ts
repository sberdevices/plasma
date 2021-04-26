import type { NotificationProps } from './Notification';

export interface InputNotification extends NotificationProps {
    timeout?: number;
}

export type ViewNotification = InputNotification & { isHiding?: boolean };

export type StateNotification = ViewNotification & { id: string };

export type NotificationState = {
    notifications: StateNotification[];
};

/**
 * Типы событий storeon.
 */
export type NotificationEvents = {
    add: StateNotification;
    hide: string;
    remove: string;
};
