import React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { IconApps } from '@sberdevices/plasma-icons';

import { direction, Tooltip } from './Tooltip';

export default {
    title: 'Tooltip',
    component: Tooltip,
    decorators: [
        (story) => (
            <div
                style={{
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
    'top',
    'top-right',

    // 'right-top',
    'right',
    // 'right-bottom',

    'bottom-right',
    'bottom',
    'bottom-left',

    // 'left-bottom',
    'left',
    // 'left-top',
];

export const Default = () => {
    const args = {
        text: text('text', 'Высокое качество воспроизведения'),
        visible: boolean('visible', true),
        direction: select('direction', directions, 'top-center') as direction,
        children: <IconApps />,
    };

    return <Tooltip {...args} />;
};
