import React from 'react';
import { TextField, TextFieldProps } from '@sberdevices/plasma-web/components/TextField';

import { TextFieldShowcase, IconPlaceholder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/TextField',
    component: TextField,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const props = { placeholder: 'Label', helperText: 'Helper text' };
const rows: Record<string, TextFieldProps> = {
    Empty: {},
    // Focus: { value: 'Title', focused: true } as any,
    Filled: { value: 'Title' },
    Error: { value: 'Title', status: 'error' },
    Disabled: { value: 'Title', disabled: true },
};
const cols = {
    Default: {},
    'Icon Right': { contentRight: <IconPlaceholder /> },
};

export const Default = () => <TextFieldShowcase props={props} rows={rows} cols={cols} component={TextField} />;
