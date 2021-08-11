import React from 'react';
import { Radiobox } from '@sberdevices/plasma-ui/components/Radiobox';

import { RadioboxShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Radiobox',
    component: Radiobox,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

export const Default = ({ withLabels, withDescription = false }: { withLabels: boolean; withDescription: boolean }) => {
    return <RadioboxShowcase withLabels={withLabels} withDescription={withDescription} component={Radiobox} />;
};
