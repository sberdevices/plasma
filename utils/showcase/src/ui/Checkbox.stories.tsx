import React from 'react';
import { Checkbox } from '@sberdevices/plasma-ui/components/Checkbox';

import { CheckboxShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Checkbox',
    component: Checkbox,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

export const Default = ({ withLabels, withDescription = false }: { withLabels: boolean; withDescription: boolean }) => {
    return <CheckboxShowcase withLabels={withLabels} withDescription={withDescription} component={Checkbox} />;
};
