import React from 'react';
import { Badge } from '@sberdevices/plasma-web/components/Badge';

import { CommonShowcase, IconPlaceholder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Content/Badge',
    component: Badge,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const sizes = { l: 'Badge L 24', s: 'Badge S 16' };
const rows = {
    Primary: { view: 'primary' },
    Secondary: { view: 'secondary' },
};
const cols = {
    Text: { text: 'Badge' },
    'Text + Icon': { text: 'Badge', contentLeft: <IconPlaceholder size="xs" /> },
    Quantity: { text: '#', circled: true },
};

export const Default = () => <CommonShowcase sizes={sizes} rows={rows} cols={cols} component={Badge} />;
