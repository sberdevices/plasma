import React from 'react';
import { text, select, number } from '@storybook/addon-knobs';

import { Button } from '../Button';

import { Toast, useToast } from '.';

export const ToastComponent = () => {
    return <Toast text={text('text', 'Short Text Message Without Action')} />;
};

export const ToastContext = () => {
    const { showToast } = useToast();

    const toastText = text('text', 'Short Text Message Without Action');
    const position = select(
        'position',
        {
            top: 'top',
            bottom: 'bottom',
        },
        'bottom',
    );

    const timeout = number('timeout', 3000);

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(toastText, position, timeout);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};
