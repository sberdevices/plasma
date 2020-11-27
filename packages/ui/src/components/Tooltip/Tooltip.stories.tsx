import React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { IconApps } from '@sberdevices/plasma-icons';

import { Direction, Tooltip } from './Tooltip';

export default {
    title: 'Tooltip',
    component: Tooltip,
    decorators: [
        (story) => (
            <div
                style={{
                    height: '12rem',
                    width: '100%',
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

const directions: Array<Direction> = [
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
        direction: select('direction', directions, 'top'),
        children: <IconApps />,
    };

    return <Tooltip {...args} />;
};
