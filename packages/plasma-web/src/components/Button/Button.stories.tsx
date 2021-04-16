import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder } from '../../helpers';

import { Button } from '.';

const onClick = action('onClick');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export const Default = () => {
    const views = ['primary', 'secondary', 'critical'];
    const sizes = ['l', 'm', 's'];
    const pins = [
        'square-square',
        'square-circle',
        'circle-square',
        'circle-circle',
        'circle-clear',
        'clear-circle',
        'clear-clear',
    ];
    const contentTypes = ['Text', 'Text+Left', 'Text+Right', 'Left'];
    const contentType = select('Content type', contentTypes, 'Text');

    return (
        <Button
            view={select('view', views, 'primary') as 'primary'}
            size={select('size', sizes, 'l') as 'l'}
            pin={select('pin', pins, 'square-square') as 'square-square'}
            disabled={boolean('disabled', false)}
            outlined={boolean('outlined', false)}
            focused={boolean('focused', false)}
            text={contentType !== 'Left' && text('text', 'Label')}
            contentLeft={(contentType === 'Left' || contentType === 'Text+Left') && <IconPlaceholder />}
            contentRight={contentType === 'Text+Right' && <IconPlaceholder />}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};
