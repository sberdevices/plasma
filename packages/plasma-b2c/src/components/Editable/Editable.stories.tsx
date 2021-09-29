import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator, disableProps } from '@sberdevices/plasma-sb-utils';
import { useCallback } from '@storybook/client-api';
import { IconEdit, IconSize } from '@sberdevices/plasma-icons';

import * as typography from '../Typography';

import { Editable, EditableProps } from '.';

const propsToDisable = ['ref', 'theme', 'as', 'forwardedAs'];

export default {
    title: 'Controls/Editable',
    component: Editable,
    argTypes: {
        iconSize: {
            options: ['s', 'xs'],
            control: { type: 'select' },
        },
        componentName: {
            options: Object.keys(typography),
            control: { type: 'select' },
        },
        ...disableProps(propsToDisable),
    },
    decorators: [InSpacingDecorator],
} as Meta;

interface ExtraProps {
    iconSize: IconSize;
    componentName: keyof typeof typography;
    defaultValue: string;
}

export const Default: Story<EditableProps & ExtraProps> = ({ defaultValue, componentName, iconSize, ...rest }) => {
    const [value, setValue] = useState<string>(defaultValue);
    const handleChange = useCallback((e) => {
        setValue(e.target.textContent);
    }, []);

    return (
        <Editable
            icon={<IconEdit size={iconSize} color="inherit" />}
            textComponent={typography[componentName]}
            value={value}
            onChange={handleChange}
            {...rest}
        />
    );
};

Default.args = {
    iconSize: 's',
    componentName: 'Headline1',
    defaultValue: 'Document 1',
};
