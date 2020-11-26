import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { IconApps } from '@sberdevices/plasma-icons';

import { direction, Tooltip } from './Tooltip';

export default {
    title: 'Tooltip',
    component: Tooltip,
    decorators: [
        (story) => (
            <div
                style={{
                    // padding: '10rem',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {story()}
            </div>
        ),
    ],
};

const directions = [
    'top-left',
    'top-center',
    'top-right',

    'right-top',
    'right-center',
    'right-bottom',

    'bottom-right',
    'bottom-center',
    'bottom-left',

    'left-bottom',
    'left-center',
    'left-top',
];

export const Default = () => {
    const args = {
        text: text('text', 'Высокое качество воспроизведения'),
        // text: 'Отсутствует текст песни',
        direction: select('direction', directions, 'top-center') as direction,
        children: <IconApps />,
    };

    return <Tooltip {...args} />;
};
