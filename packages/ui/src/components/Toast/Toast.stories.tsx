import React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';

import { Button } from '../Button';

import { useToast } from './useToast';
import { Toast } from './Toast';

export default {
    title: 'Toast',
};

export const ToastComponent = () => {
    return <Toast text={text('text', 'Short Text Message Without Action')} />;
};

export const ToastContext = () => {
    const { showToast } = useToast();

    const toastText = text('text', 'Short Text Message Without Action');
    const position = select(
        'position',
        {
            'top-left': 'top-left',
            'top-center': 'top-center',
            'top-right': 'top-right',
            'bottom-left': 'bottom-left',
            'bottom-center': 'bottom-center',
            'bottom-right': 'bottom-right',
        },
        'bottom-center',
    );

    const withTimeout = boolean('withTimeout', false);
    const timeout = number('timeout', 2000);

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(toastText, position, withTimeout ? timeout : undefined);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};
