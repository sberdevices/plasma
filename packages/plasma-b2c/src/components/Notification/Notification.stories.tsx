import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button } from '../Button';
import { Modal, ModalsProvider } from '../Modal';
import { Headline3 } from '../Typography';

import { Notification, NotificationProps, addNotification, NotificationsProvider } from '.';

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

export default {
    title: 'Controls/Notification',
} as Meta;

interface DefaultStoryProps {
    status: string;
    title: string;
    children: string;
}

export const Default: Story<DefaultStoryProps> = ({ status, title, children }) => {
    return (
        <Notification title={title} status={status !== '' ? (status as 'success') : undefined}>
            {children}
        </Notification>
    );
};

Default.args = {
    status: '',
    title: 'Title',
    children: longText,
};

Default.argTypes = {
    status: {
        control: {
            type: 'select',
            options: statuses,
        },
    },
};

export const LiveDemo: Story<{ timeout: number }> = ({ timeout }) => {
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

LiveDemo.args = {
    timeout: 3000,
};

export const WithModal: Story<{ timeout: number }> = ({ timeout }) => {
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

WithModal.args = {
    timeout: 3500,
};
