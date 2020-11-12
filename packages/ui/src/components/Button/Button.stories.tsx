import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { View, views } from '../../mixins/applyView';
import { IconClock, IconDownload } from '../Icon';
import { Icon } from '../Icon/Icon';

import { ButtonSize } from './ButtonBase';
import { Button, sizes } from './Button';
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

const sizeKeys = Object.keys(sizes) as ButtonSize[];
const viewKeys = Object.keys(views) as View[];

export const Default = () => (
    <Button
        text={text('text', 'Button')}
        size={select('size', sizeKeys, 'l')}
        view={select('view', viewKeys, 'primary')}
        motion={boolean('motion', true)}
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
        motion={boolean('motion', true)}
        outlined={boolean('outlined', true)}
        disabled={boolean('disabled', false)}
        tabIndex={0}
        onClick={action('onClick')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
    >
        <Icon icon={text('Icon name', 'download') as any} size={select('iconSize', ['xs', 's', 'm'], 's')} />
    </ActionButtonComponent>
);
