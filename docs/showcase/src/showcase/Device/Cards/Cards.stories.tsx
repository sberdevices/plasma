import React from 'react';

import { DeviceStoryDecorator, InContainerDecorator } from '../../../helpers';

import { TextBoxCardShowcase } from './TextBox';
import { TextBoxImageCardShowcase } from './TextBoxImage';
import { BasicCardShowcase } from './BasicCard';
import { ListCardShowcase } from './ListCard';

export default {
    title: 'Showcase/Device/Cards',
    decorators: [DeviceStoryDecorator, InContainerDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

export function Cards() {
    return (
        <div>
            <TextBoxCardShowcase />
            <TextBoxImageCardShowcase />
            <BasicCardShowcase />
            <ListCardShowcase />
        </div>
    );
}
