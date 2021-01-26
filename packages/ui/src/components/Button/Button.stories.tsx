import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconClock, IconDownload, Icon } from '@sberdevices/plasma-icons';

import { View } from '../../mixins/applyView';

import { ButtonSize } from './ButtonBase';

import { Button, ActionButton as ActionButtonComponent } from '.';

const actionWithPersistedEvent = (name: string) => {
    const calledAction = action(name);

    return (event) => {
        event.persist();
        calledAction(event);
    };
};
const onClickAction = actionWithPersistedEvent('onClick');
const onFocusAction = actionWithPersistedEvent('onFocus');
const onBlurAction = actionWithPersistedEvent('onBlur');

const sizeKeys = ['l', 'm', 's'] as ButtonSize[];
const viewKeys = ['primary', 'secondary', 'checked', 'warning', 'critical', 'clear'] as View[];

export const Default = () => (
    <Button
        text={text('text', 'Button')}
        size={select('size', sizeKeys, 'l')}
        view={select('view', viewKeys, 'primary')}
        scaleOnInteraction={boolean('scaleOnInteraction', true)}
        outlined={boolean('outlined', true)}
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        contentLeft={boolean('contentLeft', false) && <IconClock />}
        contentRight={boolean('contentRight', false) && ((<IconDownload />) as never)}
        onClick={onClickAction}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
    />
);

export const ActionButton = () => (
    <ActionButtonComponent
        size={select('size', sizeKeys, 'm')}
        view={select('view', viewKeys, 'primary')}
        scaleOnInteraction={boolean('scaleOnInteraction', true)}
        outlined={boolean('outlined', true)}
        disabled={boolean('disabled', false)}
        tabIndex={0}
        onClick={onClickAction}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
    >
        <Icon icon={text('Icon name', 'download') as any} size={select('iconSize', ['xs', 's'], 's')} />
    </ActionButtonComponent>
);
