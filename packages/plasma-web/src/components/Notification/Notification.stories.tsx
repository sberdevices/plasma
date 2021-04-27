import React from 'react';
import { select, text, number } from '@storybook/addon-knobs';

import { Button } from '../Button';
import { Modal, ModalsProvider } from '../Modal';
import { Headline3 } from '../Typography';

import { Notification, NotificationProps } from './Notification';

import { addNotification, NotificationsProvider } from '.';

const statuses = ['success', 'warning', 'error', ''];
const titles = ['Выполнено', 'Внимание', 'Ошибка'];
const texts = ['SSH ключ успешно скопирован', 'Нельзя скопировать SSH ключ', 'Не удалось скопировать SSH ключ'];

const longText = `JavaScript frameworks are an essential part of modern front-end web development,
providing developers with proven tools for building scalable, interactive web applications.
This module gives you some fundamental background knowledge about how client-side frameworks
work and how they fit into your toolset, before moving on to tutorial series covering some of
today's most popular ones.
`;

const getNotificationProps = (i: number) => ({
    status: statuses[i % 3] as NotificationProps['status'],
    title: titles[i % 3],
    children: texts[i % 3],
});

export const Default = () => {
    const status = select('status', statuses, '');

    return (
        <Notification title={text('title', 'Title')} status={status !== '' ? (status as 'success') : undefined}>
            {text('children', longText)}
        </Notification>
    );
};

export const LiveDemo = () => {
    const timeout = number('timeout', 3500);
    const count = React.useRef(0);
    const handleClick = React.useCallback(() => {
        addNotification(getNotificationProps(count.current), timeout);
        count.current++;
    }, [count]);

    return (
        <NotificationsProvider>
            <Button text="Add notification" onClick={handleClick} />
        </NotificationsProvider>
    );
};

export const WithModal = () => {
    const timeout = number('timeout', 3500);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const count = React.useRef(0);
    const handleClick = React.useCallback(() => {
        addNotification(getNotificationProps(count.current), timeout);
        count.current++;
    }, [count]);

    return (
        <ModalsProvider>
            <NotificationsProvider>
                <Button text="Open modal" onClick={() => setIsModalOpen(true)} />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Headline3>Hello!</Headline3>
                    <Button view="primary" text="Add notification" onClick={handleClick} />
                </Modal>
            </NotificationsProvider>
        </ModalsProvider>
    );
};
