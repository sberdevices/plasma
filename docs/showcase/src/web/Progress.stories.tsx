import React from 'react';
import { Progress } from '@sberdevices/plasma-web/components/Progress';

import { BadgeShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Progress',
    component: Progress,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const rows = {
    Success: { status: 'success', value: 25 },
    Warning: { status: 'warning', value: 50 },
    Error: { status: 'error', value: 75 },
};
const cols = {
    Default: {},
    NoValue: { displayValue: false },
};

export function Default() {
    return <BadgeShowcase rows={rows} cols={cols} component={Progress} columns="repeat(2, 5rem)" />;
}
