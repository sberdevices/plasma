import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder, disableProps } from '../../helpers';

import { Button, ButtonProps } from '.';

const views = ['primary', 'secondary', 'success', 'warning', 'critical', 'checked', 'clear'];
const sizes = ['l', 'm', 's'];
const pins = [
    'square-square',
    'circle-circle',
    'circle-clear',
    'clear-circle',
    'clear-clear',
    'square-clear',
    'clear-square',
];

const contentTypes = ['Text', 'Text+Left', 'Text+Right', 'Left'];

const onClick = action('onClick');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const propsToDisable = [
    'theme',
    'as',
    'forwardedAs',
    'contentLeft',
    'contentRight',
    'shiftLeft',
    'shiftRight',
    'blur',
    'stretch',
    'square',
];

export default {
    title: 'Controls/Button',
    argTypes: {
        contentType: {
            control: {
                type: 'select',
                options: contentTypes,
            },
        },
        text: {
            control: {
                type: 'text',
            },
        },
        size: {
            control: {
                type: 'inline-radio',
                options: sizes,
            },
        },
        view: {
            control: {
                type: 'select',
                options: views,
            },
        },
        pin: {
            control: {
                type: 'select',
                options: pins,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

type ButtonStoryProps = ButtonProps & { contentType: string };

const args: ButtonStoryProps = {
    view: 'primary',
    size: 'l',
    pin: 'square-square',
    disabled: false,
    outlined: false,
    focused: false,
    text: 'Label',
    contentType: 'Text',
    onClick,
    onFocus,
    onBlur,
};

export const Default: Story<ButtonStoryProps> = ({ contentType, text, ...rest }) => {
    return (
        <Button
            text={contentType !== 'Left' && text}
            contentLeft={(contentType === 'Left' || contentType === 'Text+Left') && <IconPlaceholder />}
            contentRight={contentType === 'Text+Right' && <IconPlaceholder />}
            {...rest}
        />
    );
};

Default.args = args;

export const Anchor: Story<ButtonStoryProps> = ({ contentType, text, ...rest }) => (
    <Button
        as="a"
        text={contentType !== 'Left' && text}
        contentLeft={(contentType === 'Left' || contentType === 'Text+Left') && <IconPlaceholder />}
        contentRight={contentType === 'Text+Right' && <IconPlaceholder />}
        {...rest}
    />
);

Anchor.args = args;
