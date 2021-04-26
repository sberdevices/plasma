import React from 'react';
import { Notification } from '@sberdevices/plasma-web/components/Notification';

import { BadgeShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Notification',
    component: Notification,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const rows = {
    Default: {},
    Success: { status: 'success' },
    Warning: { status: 'warning' },
    Error: { status: 'error' },
};
const cols = {
    Full: {
        title: 'Notification',
        text: 'JavaScript frameworks are an essential part of modern front-end web development',
        badgeText: 99,
    },
};

export const Default = () => (
    <BadgeShowcase rows={rows} cols={cols} component={Notification} columns="repeat(1, max-content)" />
);
