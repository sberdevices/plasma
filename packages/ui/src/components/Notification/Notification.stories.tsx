import React from 'react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { Button } from '../Button';

import { Notification } from './Notification';
import { addNotification } from './notificationStore';
import { NotificationsProvider } from './NotificationsProvider';

export default {
    title: 'Notification',
    component: Notification,
    decorators: [
        (Story) => {
            return (
                <div style={{ display: 'flex', padding: '40px' }}>
                    <NotificationsProvider>
                        <Story />
                    </NotificationsProvider>
                </div>
            );
        },
    ],
};

export const NotificationComponent = () => {
    return (
        <Notification
            type={select('type', { info: 'info', warning: 'warning', default: 'default' }, 'warning')}
            titleType={select('titleType', { normal: 'normal', headline: 'headline', thin: 'thin' }, 'normal')}
            title={text('title', 'Ирина Иванова')}
            subTitle={text('subTitle', 'Входящий вызов')}
            actions={[{ name: 'Ответить', action: action('action1'), view: 'secondary' }]}
            reverseTitles={boolean('reverseTitles', false)}
            imageSrc={select('imageSrc', { none: null, avocado: './images/avocado.png' }, '')}
            labelSrc={select('labelSrc', { none: null, avocado: './images/avocado.png' }, '')}
            textSpacing={number('textSpacing', 0)}
        />
    );
};
export const WarningExample = () => {
    return (
        <Notification
            type="warning"
            titleType="headline"
            title="через 30 секунд"
            subTitle="Устройство выключится"
            actions={[{ name: 'Отменить', action: action('action1'), view: 'critical' }]}
            reverseTitles
        />
    );
};
export const DefaultExample = () => {
    return (
        <Notification
            type="default"
            titleType="headline"
            title="Ирина Иванова"
            subTitle="Входящий вызов"
            imageSrc="./images/avocado.png"
            actions={[
                { name: 'Ответить', action: action('action1'), view: 'primary' },
                { name: 'Отклонить', action: action('action2'), view: 'critical' },
            ]}
        />
    );
};
export const InfoExample = () => {
    return (
        <Notification
            type="info"
            titleType="thin"
            title="Ваше королевство захвачено. Скорее переходите и исправляйте ситуацию!"
            subTitle="Да, Милорд!"
            actions={[{ name: 'Кнопка', action: action('action1') }]}
            labelSrc="./images/avocado.png"
            reverseTitles
            textSpacing={8}
        />
    );
};

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    height: 70vh;
    flex-direction: column;
    margin: auto 0;
    z-index: 1000;

    & > :first-child {
        margin-bottom: 16px;
    }
`;

export const Notifications = () => {
    return (
        <ButtonsWrapper>
            <Button
                onClick={() =>
                    addNotification({
                        type: 'warning',
                        title: 'Ирина Иванова',
                        subTitle: 'Входящий вызов',
                        actions: [{ name: 'Ответить', action: () => undefined }],
                        timeout: 8000,
                    })
                }
            >
                Показать оповещение
            </Button>
            <Button
                onClick={() =>
                    addNotification({
                        type: 'info',
                        title: 'Ваше королевство захвачено. Скорее переходите и исправляйте ситуацию!',
                        titleType: 'thin',
                        subTitle: 'Да, Милорд!',
                        actions: [{ name: 'Кнопка', action: () => undefined }],
                        timeout: 8000,
                        reverseTitles: true,
                        textSpacing: 8,
                        labelSrc: './images/avocado.png',
                    })
                }
            >
                Показать инфо-оповещение
            </Button>
        </ButtonsWrapper>
    );
};
