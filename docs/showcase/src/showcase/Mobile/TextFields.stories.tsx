import React from 'react';
import { TextField, TextFieldProps } from '@sberdevices/ui/components/TextField';

import {
    ShowcasePanel,
    ShowcaseSectionName,
    TextFieldShowcase,
    IconPlaceholder,
    UIStoryDecorator,
    InSpacingDecorator,
} from '../../helpers';

export default {
    title: 'Showcase/Mobile',
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
    Default: {},
    'Icon Right': { contentRight: <IconPlaceholder /> },
};

export const TextFields = () => (
    <>
        <ShowcaseSectionName title="TextField" subTitle="Стандартное поле текстового ввода" />
        <ShowcasePanel>
            <TextFieldShowcase props={props} rows={rows} cols={cols} component={TextField} />
        </ShowcasePanel>
    </>
);
