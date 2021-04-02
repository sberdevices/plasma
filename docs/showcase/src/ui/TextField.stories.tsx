import React from 'react';
import { TextField, TextFieldProps } from '@sberdevices/plasma-ui/components/TextField';

import { TextFieldShowcase, IconPlaceholder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/TextField',
    component: TextField,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const props = { label: 'Label', helperText: 'Helper text' };
const rows: Record<string, TextFieldProps> = {
    Empty: {},
    // Focus: { value: 'Title', focused: true } as any,
    Filled: { value: 'Title' },
    Success: { value: 'Title', status: 'success' },
    Error: { value: 'Title', status: 'error' },
    Disabled: { value: 'Title', disabled: true },
};
const cols = {
    'Label Text': {},
    'Label Text + Icon': { contentLeft: <IconPlaceholder /> },
    'Label Text + Action': { contentRight: <IconPlaceholder /> },
    'Label Text + Icon + Action': { contentLeft: <IconPlaceholder />, contentRight: <IconPlaceholder /> },
};

export const Default = () => <TextFieldShowcase props={props} rows={rows} cols={cols} component={TextField} />;
