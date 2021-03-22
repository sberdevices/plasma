import React from 'react';
import { Radiobox } from '@sberdevices/plasma-web/components/Radiobox';

import { RadioboxShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Radiobox',
    component: Radiobox,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

/* eslint-disable prefer-rest-params */
export function Default() {
    return <RadioboxShowcase {...arguments[0]} component={Radiobox} />;
}
/* eslint-enable prefer-rest-params */
