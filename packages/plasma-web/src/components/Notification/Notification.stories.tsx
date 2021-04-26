import React from 'react';
import { select, text, number } from '@storybook/addon-knobs';

import { InSpacingDecorator } from '../../helpers';
import { Button } from '../Button';

import { Notification, NotificationProps, NotificationsProvider, addNotification } from '.';

export default {
    title: 'Controls/Notification',
    component: Notification,
    decorators: [InSpacingDecorator],
};

const statuses = ['success', 'warning', 'error', ''];
const titles = ['Выполнено', 'Внимание', 'Ошибка'];
const texts = ['SSH ключ успешно скопирован', 'Нельзя скопировать SSH ключ', 'Не удалось скопировать SSH ключ'];

const longText = `JavaScript frameworks are an essential part of modern front-end web development,
providing developers with proven tools for building scalable, interactive web applications.
This module gives you some fundamental background knowledge about how client-side frameworks
work and how they fit into your toolset, before moving on to tutorial series covering some of
today's most popular ones.
`;

export const Default = () => {
    const status = select('status', statuses, '');

    return (
        <Notification
            title={text('title', 'Title')}
            text={text('text', longText)}
            status={status !== '' ? (status as 'success') : undefined}
            badgeText={text('badgeText', '21')}
        />
    );
};

export const LiveDemo = () => {
    const timeout = number('timeout', 3500);
    const count = React.useRef(0);
    const handleClick = React.useCallback(() => {
        addNotification({
            status: statuses[count.current % 3] as NotificationProps['status'],
            title: titles[count.current % 3],
            text: texts[count.current % 3],
            badgeText: count.current.toString(),
            timeout,
        });
        count.current++;
    }, [count]);

    return (
        <NotificationsProvider>
            <Button text="Add notification" onClick={handleClick} />
        </NotificationsProvider>
    );
};
