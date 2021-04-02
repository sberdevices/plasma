import React from 'react';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Image } from '.';

export default {
    title: 'Content/Image',
    component: Image,
    decorators: [InSpacing],
};

export const Default = () => (
    <div style={{ maxWidth: '10rem' }}>
        <Image src="./images/320_320_9.jpg" ratio="1 / 1" />
    </div>
);
