import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button } from '../Button';

import { Position } from './types';

import { Toast, useToast, ToastProps } from '.';

export default {
    title: 'Controls/Toast',
} as Meta;

export const Default: Story<ToastProps> = (args) => <Toast {...args} />;

Default.args = {
    text: 'Short Text Message Without Action',
};

interface LiveDemoProps extends ToastProps {
    position: Position;
    timeout: number;
    fade: boolean;
}

export const LiveDemo: Story<LiveDemoProps> = ({ role, text, position, timeout, fade }) => {
    const { showToast } = useToast();

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(text, position, timeout, fade, role);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};

LiveDemo.args = {
    role: 'status',
    text: 'Short Text Message Without Action',
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
