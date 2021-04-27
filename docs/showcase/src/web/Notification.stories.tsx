import React from 'react';
import { Notification } from '@sberdevices/plasma-web/components/Notification/Notification';

import { BadgeShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Notification',
    component: Notification,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const rows = {
    Success: { status: 'success' },
    Warning: { status: 'warning' },
    Error: { status: 'error' },
};
const cols = {
    Full: {
        title: 'Notification',
        children: 'JavaScript frameworks are an essential part of modern front-end web development',
    },
};

export const Default = () => (
    <BadgeShowcase rows={rows} cols={cols} component={Notification} columns="repeat(1, max-content)" />
);
