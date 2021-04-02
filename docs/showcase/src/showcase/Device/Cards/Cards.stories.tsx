import React from 'react';

import { DeviceStoryDecorator, InContainerDecorator } from '../../../helpers';

import { TextBoxCardShowcase } from './TextBox';
import { TextBoxImageCardShowcase } from './TextBoxImage';
import { BasicCardShowcase } from './BasicCard';
import { ListCardShowcase } from './ListCard';
import { ImageCardShowcase } from './ImageCard';

export default {
    title: 'Showcase/Device',
    decorators: [DeviceStoryDecorator],
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
            <ImageCardShowcase />
            <BasicCardShowcase />
            <ListCardShowcase />
        </div>
    );
}
