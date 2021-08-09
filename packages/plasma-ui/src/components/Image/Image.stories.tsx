import React from 'react';
import { Story, Meta } from '@storybook/react';

import { disableProps } from '../../helpers';
import { InSpacing } from '../../helpers/StoryDecorators';

import { Image, ImageProps, Ratio } from '.';

const bases = ['div', 'img'];

const propsToDisable = ['view', 'height', 'customRatio'];

const ratios = ['1/1', '3/4', '4/3', '9/16', '16/9', '1/2', '2/1'];

export default {
    title: 'Content/Image',
    component: Image,
    decorators: [InSpacing],
    argTypes: {
        base: {
            control: {
                type: 'inline-radio',
                options: bases,
            },
        },
        ratio: {
            control: {
                type: 'select',
                options: ratios,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<ImageProps & { ratio: Ratio }> = ({ base, ratio }) => (
    <div style={{ maxWidth: '10rem' }}>
        <Image
            src="./images/320_320_9.jpg"
            ratio={ratio}
            base={base}
            alt="картинка для примера фоном"
            style={{ position: 'relative' }}
        />
    </div>
);

Default.args = {
    base: 'div',
    ratio: '1/1',
};
