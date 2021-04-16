import React from 'react';

import { UIStoryDecorator } from '../../../helpers';

import { TextBoxCardShowcase } from './TextBox';
import { TextBoxImageCardShowcase } from './TextBoxImage';
import { BasicCardShowcase } from './BasicCard';
import { ListCardShowcase } from './ListCard';
import { ImageCardShowcase } from './ImageCard';
import { ItemCardShowcase } from './ItemCard';

export default {
    title: 'Showcase/Device',
    decorators: [UIStoryDecorator],
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
            <ItemCardShowcase />
        </div>
    );
}
