import React from 'react';
import { select } from '@storybook/addon-knobs';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Image } from '.';

export default {
    title: 'Content/Image',
    component: Image,
    decorators: [InSpacing],
};

const bases = ['div', 'img'];

export const Default = () => (
    <div style={{ maxWidth: '10rem' }}>
        <Image src="./images/320_320_9.jpg" ratio="1 / 1" alt="картинка для примера" />
    </div>
);

export const Basic = () => (
    <div style={{ maxWidth: '10rem' }}>
        <Image
            src="./images/320_320_9.jpg"
            ratio="1 / 1"
            base={select('base', bases, 'div') as 'div'}
            alt="картинка для примера фоном"
            style={{ position: 'relative' }}
        />
    </div>
);
