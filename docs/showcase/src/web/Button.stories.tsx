import React from 'react';
import { Button } from '@sberdevices/plasma-web/components/Button';

import { actionWithPersistedEvent, ButtonShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Button',
    component: Button,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const onClick = actionWithPersistedEvent('onClick');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const sections = [
    { title: 'Button L 56', props: { size: 'l' } },
    { title: 'Button M 48', props: { size: 'm' } },
    { title: 'Button S 40', props: { size: 's' } },
];
const rows = {
    Primary: { view: 'primary' },
    Secondary: { view: 'secondary' },
    Critical: { view: 'critical' },
    Clear: { view: 'clear' },
};
const defaults = { focused: false, disabled: false, stretch: true, text: 'Label', onClick, onFocus, onBlur };
const cols = {
    // ToDo: Hover, Pressed
    Stretch: { ...defaults },
    'Stretch + Focused': { ...defaults, outlined: true, focused: true },
    'Stretch + Disabled': { ...defaults, disabled: true },
    Auto: { ...defaults, stretch: false },
    Squared: { ...defaults, square: true, text: '' },
    'Squared + Focused': { ...defaults, square: true, text: '', outlined: true, focused: true },
    Circle: { ...defaults, square: true, text: '', pin: 'circle-circle' },
    'Circle + Focused': { ...defaults, square: true, text: '', outlined: true, focused: true, pin: 'circle-circle' },
};

export const Default = () => (
    <ButtonShowcase
        sections={sections}
        rows={rows}
        cols={cols}
        columns="repeat(3, 13.75rem) repeat(5, max-content)"
        component={Button}
    />
);
