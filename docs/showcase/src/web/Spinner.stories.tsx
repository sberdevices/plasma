import React from 'react';
import { Spinner } from '@sberdevices/plasma-web/components/Spinner';

import { CommonShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Content/Spinner',
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const rows = {
    Default: {},
    White: { color: 'white' },
};
const cols = {
    16: { size: 16 },
    24: { size: 24 },
    56: { size: 56 },
    84: { size: 84 },
};

export const Default = () => <CommonShowcase rows={rows} cols={cols} component={Spinner} />;
