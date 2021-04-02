import React from 'react';
import { Checkbox } from '@sberdevices/plasma-ui/components/Checkbox';

import { CheckboxShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Checkbox',
    component: Checkbox,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

/* eslint-disable prefer-rest-params */
export function Default() {
    return <CheckboxShowcase {...arguments[0]} component={Checkbox} />;
}
/* eslint-enable prefer-rest-params */
