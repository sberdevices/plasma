import React from 'react';
import { Spinner } from '@sberdevices/plasma-ui/components/Spinner';

import { CommonShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Spinner',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const rows = {
    Default: {},
    White: { color: 'white' },
};
const cols = {
    14: { size: 14 },
    24: { size: 24 },
    56: { size: 56 },
    84: { size: 84 },
};

export const Default = () => <CommonShowcase rows={rows} cols={cols} component={Spinner} />;
