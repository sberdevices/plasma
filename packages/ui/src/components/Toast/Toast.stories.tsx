import React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';

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
    const fade = boolean('fade', true);

    return (
        <div>
            <Button
                onClick={() => {
                    showToast(toastText, position, timeout, fade);
                }}
            >
                Показать уведомление
            </Button>
        </div>
    );
};

ToastContext.parameters = {
    chromatic: {
        disable: true,
    },
};
