import React from 'react';
import { Checkbox } from '@sberdevices/plasma-web/components/Checkbox';

import { CheckboxShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Checkbox',
    component: Checkbox,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

export const Default = (props: { withLabels: boolean; withDescription: boolean }) => {
    return <CheckboxShowcase {...props} component={Checkbox} />;
};
