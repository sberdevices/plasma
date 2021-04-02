import React from 'react';
import { Badge } from '@sberdevices/plasma-ui/components/Badge';

import { CommonShowcase, IconPlaceholder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Badge',
    component: Badge,
    decorators: [UIStoryDecorator, InSpacingDecorator],
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
