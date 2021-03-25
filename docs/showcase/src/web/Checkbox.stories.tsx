import React from 'react';
import { Checkbox } from '@sberdevices/plasma-web/components/Checkbox';

import { CheckboxShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Checkbox',
    component: Checkbox,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

/* eslint-disable prefer-rest-params */
export function Default() {
    return <CheckboxShowcase {...arguments[0]} component={Checkbox} />;
}
/* eslint-enable prefer-rest-params */
