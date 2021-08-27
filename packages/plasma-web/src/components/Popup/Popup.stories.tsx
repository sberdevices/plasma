import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { InSpacingDecorator, disableProps } from '../../helpers';
import { Button } from '../Button';

import { Popup, PopupProps } from '.';

export default {
    title: 'Controls/Popup',
    component: Popup,
    decorators: [InSpacingDecorator],
    argTypes: {
        ...disableProps(['children', 'disclosure', 'isOpen', 'onToggle']),
    },
} as Meta;

interface PopupStoryProps extends Omit<PopupProps, 'children' | 'disclosure' | 'isOpen'> {}

export const Default: Story<PopupStoryProps> = ({ ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popup {...rest} disclosure={<Button text="Open popup" />} isOpen={isOpen} onToggle={(is) => setIsOpen(is)}>
            Popup content
        </Popup>
    );
};

Default.args = {
    trigger: 'click',
    placement: 'bottom',
};
