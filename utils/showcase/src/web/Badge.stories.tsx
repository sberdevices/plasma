import React from 'react';
import { Badge } from '@sberdevices/plasma-web/components/Badge';

import { BadgeShowcase, IconPlaceholder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Content/Badge',
    component: Badge,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const rows = {
    Primary: { view: 'primary' },
    Secondary: { view: 'secondary' },
    Success: { view: 'success' },
    Warning: { view: 'warning' },
    Critical: { view: 'critical' },
};
const cols = {
    Text: { text: 'Badge' },
    'Text + Icon': { text: 'Badge', contentLeft: <IconPlaceholder size="xs" /> },
    Quantity: { text: '#', circled: true },
};

export const Default = () => <BadgeShowcase rows={rows} cols={cols} component={Badge} />;
