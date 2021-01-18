import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconClock, IconDownload, Icon } from '@sberdevices/plasma-icons';

import { View } from '../../mixins/applyView';

import { ButtonSize } from './ButtonBase';
import { Button } from './Button';
import { ActionButton as ActionButtonComponent } from './ActionButton';

export default {
    title: 'Button',
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

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
        contentRight={boolean('contentRight', false) && <IconDownload />}
        onClick={action('onClick')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
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
        onClick={action('onClick')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
    >
        <Icon icon={text('Icon name', 'download') as any} size={select('iconSize', ['xs', 's'], 's')} />
    </ActionButtonComponent>
);
