import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button } from '../Button';

import { Position } from './types';

import { Toast, useToast, ToastProps } from '.';

export default {
    title: 'Controls/Toast',
} as Meta;

export const ToastComponent: Story<ToastProps> = (args) => <Toast {...args} />;

ToastComponent.args = {
    text: 'Short Text Message Without Action',
};

interface LiveDemoProps {
    toastText: string;
    position: string;
    timeout: number;
    fade: boolean;
}

export const LiveDemo: Story<LiveDemoProps> = ({ toastText, position, timeout, fade }) => {
    const { showToast } = useToast();

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(toastText, position as Position, timeout, fade);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};

LiveDemo.args = {
    toastText: 'Short Text Message Without Action',
    position: 'bottom',
    timeout: 3000,
    fade: true,
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
