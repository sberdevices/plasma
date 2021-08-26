import React from 'react';
import { Radiobox } from '@sberdevices/plasma-web/components/Radiobox';

import { RadioboxShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Radiobox',
    component: Radiobox,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

export const Default = (props: { withLabels: boolean; withDescription: boolean }) => {
    return <RadioboxShowcase {...props} component={Radiobox} radioboxStyles={{ width: '200px' }} />;
};
