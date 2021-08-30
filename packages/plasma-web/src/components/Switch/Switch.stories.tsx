import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { InSpacingDecorator, disableProps } from '../../helpers';

import { Switch, SwitchProps } from '.';

const propsToDisable = [
    'id',
    'onFocus',
    'onBlur',
    'onChange',
    'value',
    'checked',
    'description',
    'focused',
    'pressed',
    'outlined',
    'theme',
    'as',
    'forwardedAs',
];

export default {
    title: 'Controls/Switch',
    component: Switch,
    decorators: [InSpacingDecorator],
    argTypes: {
        label: {
            control: {
                type: 'text',
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const StyledWrapper = styled.div`
    width: 13.75rem;
`;

export const Default: Story<SwitchProps> = (args) => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <StyledWrapper>
            <Switch
                value={value}
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked);
                    onChange(event);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                {...args}
            />
        </StyledWrapper>
    );
};

Default.args = {
    label: 'Label',
    disabled: false,
};
