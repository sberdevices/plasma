import React from 'react';
import { TextField } from '@sberdevices/plasma-ui';

import { TextFieldShowcase, IconPlaceholder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/TextField',
    component: TextField,
    decorators: [UIStoryDecorator, InSpacingDecorator],
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
