import React from 'react';
import { ModalView } from '@sberdevices/plasma-web/components/Modal/ModalView';
import { Headline1, P1 } from '@sberdevices/plasma-web/components/Typography';

import { WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Modal',
    component: ModalView,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

export const Default = () => {
    return (
        <ModalView>
            <Headline1>Plasma Web</Headline1>
            <P1>Plasma Web</P1>
        </ModalView>
    );
};
