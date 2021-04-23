import React from 'react';
import { Select } from '@sberdevices/plasma-web/components/Select';

import { TextFieldShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Select',
    component: Select,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const items = [{ value: 'title', label: 'Title' }];
const props = { placeholder: 'Label', items };
const rows = {
    Empty: {},
    Filled: { value: 'title' },
};
const cols = {
    Default: {},
    Focus: { focused: true },
};

export const Default = () => <TextFieldShowcase props={props} rows={rows} cols={cols} component={Select as any} />;
