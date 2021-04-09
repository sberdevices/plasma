import React from 'react';
import { TextArea, TextAreaProps } from '@sberdevices/plasma-web/components/TextArea';

import { TextFieldShowcase, IconPlaceholder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/TextArea',
    component: TextArea,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const props = { placeholder: 'Label', helperText: 'Helper text' };
const rows: Record<string, TextAreaProps> = {
    Empty: {},
    // ToDo: Focus: { value: 'Title', focused: true } as any,
    Filled: { value: 'Title' },
    Error: { value: 'Title', status: 'error' },
    Disabled: { value: 'Title', disabled: true },
};
const cols = {
    Default: {},
    'Icon Right': { contentRight: <IconPlaceholder /> },
};

export const Default = () => <TextFieldShowcase props={props} rows={rows} cols={cols} component={TextArea} />;
