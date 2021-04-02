import React from 'react';
import { Radiobox } from '@sberdevices/plasma-ui/components/Radiobox';

import { RadioboxShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Radiobox',
    component: Radiobox,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

/* eslint-disable prefer-rest-params */
export function Default() {
    return <RadioboxShowcase {...arguments[0]} component={Radiobox} />;
}
/* eslint-enable prefer-rest-params */
