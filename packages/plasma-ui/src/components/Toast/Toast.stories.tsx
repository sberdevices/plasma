import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IconClose } from '@sberdevices/plasma-icons';
import { critical } from '@sberdevices/plasma-core';

import { Button } from '../Button';

import { Toast, useToast, ToastProps, ToastPosition } from '.';

export default {
    title: 'Controls/Toast',
} as Meta;

export const Default: Story<ToastProps> = (args) => <Toast {...args} />;

Default.args = {
    text: 'Текст всплывающего уведомления',
};

interface LiveDemoProps extends ToastProps {
    position: ToastPosition;
    timeout: number;
    fade: boolean;
}

export const LiveDemo: Story<LiveDemoProps> = ({ role, text, position, timeout, fade, enableContentLeft }) => {
    const { showToast } = useToast();
    const contentLeft = enableContentLeft && <IconClose size="xs" color={critical} />;

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(text, position, timeout, fade, contentLeft, role);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};

LiveDemo.args = {
    role: 'alert',
    text: 'Текст всплывающего уведомления',
    enableContentLeft: true,
    position: 'bottom',
    timeout: 10000,
    fade: true,
};

LiveDemo.argTypes = {
    role: {
        control: {
            type: 'inline-radio',
            options: ['alert', 'log', 'status'],
        },
    },
    position: {
        control: {
            type: 'inline-radio',
            options: ['top', 'bottom'],
        },
    },
};

LiveDemo.parameters = {
    chromatic: {
        disable: true,
    },
};
