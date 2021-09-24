import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IconClose } from '@sberdevices/plasma-icons';
import { critical } from '@sberdevices/plasma-tokens-b2c';

import { Button } from '../Button';

import { Toast, useToast, ToastProps, ToastPosition } from '.';

export default {
    title: 'Controls/Toast',
} as Meta;

export const ToastComponent: Story<ToastProps> = (args) => <Toast {...args} />;

ToastComponent.args = {
    text: 'Short Text Message Without Action',
};

interface LiveDemoProps {
    toastText: string;
    enableContentLeft: boolean;
    position: ToastPosition;
    timeout: number;
    fade: boolean;
}

export const LiveDemo: Story<LiveDemoProps> = ({ toastText, position, timeout, fade, enableContentLeft }) => {
    const { showToast } = useToast();
    const contentLeft = enableContentLeft && <IconClose size="xs" color={critical} />;

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(toastText, position, timeout, fade, contentLeft);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};

LiveDemo.args = {
    toastText: 'Short Text Message Without Action',
    enableContentLeft: true,
    position: 'bottom',
    timeout: 3000,
    fade: false,
};

LiveDemo.argTypes = {
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
