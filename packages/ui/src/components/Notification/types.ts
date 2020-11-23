import { View } from '../../mixins';

export type NotificationType = 'default' | 'info' | 'warning';

export type TitleType = 'normal' | 'headline' | 'thin';

export type InputNotification = {
    type?: NotificationType;
    title?: string;
    subTitle?: string;
    titleType?: TitleType;
    textSpacing?: number;
    timeout?: number;
    reverseTitles?: boolean;
    imageSrc?: string;
    labelSrc?: string;
    actions?: Array<{ name: string; action: () => void; view?: View }>;
};

export type ViewNotification = InputNotification & { isHiding?: boolean };

export type StateNotification = ViewNotification & { id: string };

export type NotificationState = {
    notifications: StateNotification[];
};

export type NotificationEvents = {
    add: StateNotification;
    hide: string;
    remove: string;
};
