import React from 'react';
import { Image } from '@sberdevices/plasma-ui/components/Image';

import { CardShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Image',
    component: Image,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const src = './images/320_320_9.jpg';
const sections = {
    Square: { '1 / 1': <Image key="square" src={src} ratio="1 / 1" /> },
    Landscape: {
        '4 / 3': <Image key="4 / 3" src={src} ratio="4 / 3" />,
        '16 / 9': <Image key="16 / 9" src={src} ratio="16 / 9" />,
        '2 / 1': <Image key="2 / 1" src={src} ratio="2 / 1" />,
    },
    Portrait: {
        '3 / 4': <Image key="3 / 4" src="./images/240_320_9.jpg" ratio="3 / 4" />,
        '9 / 16': <Image key="9 / 16" src="./images/180_320_9.jpg" ratio="9 / 16" />,
        '1 / 2': <Image key="1 / 2" src="./images/160_320_9.jpg" ratio="1 / 2" />,
    },
    Div: {
        '1 / 1': <Image base="div" key="Div square" src={src} ratio="1 / 1" style={{ width: 320 }} />,
        '4 / 3': <Image base="div" key="Div 4 / 4" src="./images/240_320_9.jpg" ratio="4 / 3" style={{ width: 320 }} />,
        '3 / 4': <Image base="div" key="Div 3 / 4" src="./images/240_320_9.jpg" ratio="3 / 4" style={{ width: 320 }} />,
    },
};

export const Default = () => <CardShowcase sections={sections} colWidth="10rem" />;
