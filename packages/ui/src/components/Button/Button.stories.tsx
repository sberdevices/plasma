import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { IconMic } from '@sberdevices/plasma-icons';

import { actionWithPersistedEvent } from '../../helpers';

import { sizes, views, pins } from './Button.examples';

import { Button, ActionButton } from '.';

const onClick = actionWithPersistedEvent('onClick');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

export const Default = () => (
    <Button
        text={text('text', 'Label')}
        size={select('size', sizes, 'm') as 'm'}
        view={select('view', views, 'primary') as 'primary'}
        pin={select('pin', pins, 'square-square') as 'square-square'}
        contentLeft={boolean('contentLeft', true) && <IconMic size="s" color="inherit" />}
        scaleOnInteraction={boolean('scaleOnInteraction', true)}
        outlined={boolean('outlined', true)}
        focused={boolean('focused', false)}
        disabled={boolean('disabled', false)}
        square={boolean('square', false)}
        resizible={boolean('resizible', false)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
    />
);

// eslint-disable-next-line @typescript-eslint/camelcase
export const Action_Button = () => (
    <ActionButton
        size={select('size', sizes, 'm') as 'm'}
        view={select('view', views, 'primary') as 'primary'}
        pin={select('pin', pins, 'square-square') as 'square-square'}
        scaleOnInteraction={boolean('scaleOnInteraction', true)}
        outlined={boolean('outlined', true)}
        disabled={boolean('disabled', false)}
        resizible={boolean('resizible', false)}
        tabIndex={0}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
    >
        <IconMic size="xs" color="inherit" />
    </ActionButton>
);
