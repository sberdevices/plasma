import React from 'react';
import { Button } from '@sberdevices/ui/components/Button';
import { Card, CardBody, CardMedia, CardContent, CardParagraph1 } from '@sberdevices/ui/components/Card';
import { Cell, CellListItem, CellIcon, CellDisclosure } from '@sberdevices/ui/components/Cell';
import { Body1 } from '@sberdevices/ui/components/Typography';
import {
    TextBox,
    TextBoxBigTitle,
    TextBoxBiggerTitle,
    TextBoxTitle,
    TextBoxSubTitle,
} from '@sberdevices/ui/components/TextBox';

import { CardShowcase, IconPlaceholder, DeviceStoryDecorator, InContainerDecorator } from '../../../helpers';

import { TextBoxCardShowcase } from './TextBox';
import { TextBoxImageCardShowcase } from './TextBoxImage';

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
        </div>
    );
}
