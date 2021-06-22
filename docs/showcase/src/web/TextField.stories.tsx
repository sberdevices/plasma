import React from 'react';
import { TextField } from '@sberdevices/plasma-web';

import { TextFieldShowcase, IconPlaceholder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/TextField',
    component: TextField,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const props = { value: '', label: 'Label' };
const rows = {
    Default: {},
    Focus: { $isFocused: true },
    Success: { status: 'success' },
    Warning: { status: 'warning' },
    Error: { status: 'error' },
    Disabled: { disabled: true },
    Readonly: { readOnly: true },
};
const cols = {
    Empty: {},
    Filled: { value: 'Title' },
    Helper: { value: 'Title', helperText: 'Helper text' },
    Icon: { value: 'Title', helperText: 'Helper text', contentLeft: <IconPlaceholder /> },
    Action: { value: 'Title', helperText: 'Helper text', contentRight: <IconPlaceholder /> },
    'Icon + Action': {
        value: 'Title',
        helperText: 'Helper text',
        contentLeft: <IconPlaceholder />,
        contentRight: <IconPlaceholder />,
    },
};

export const Default = () => <TextFieldShowcase props={props} rows={rows} cols={cols} component={TextField} />;
