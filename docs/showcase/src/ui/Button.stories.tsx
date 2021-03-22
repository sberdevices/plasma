import React from 'react';
import { Button } from '@sberdevices/ui/components/Button';

import { actionWithPersistedEvent, ButtonShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Button',
    component: Button,
    decorators: [UIStoryDecorator, InSpacingDecorator],
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
    Warning: { view: 'warning' },
    Critical: { view: 'critical' },
    Checked: { view: 'checked' },
    Overlay: { view: 'overlay' },
    Clear: { view: 'clear' },
};
const defaults = { focused: false, disabled: false, resizible: true, text: 'Label', onClick, onFocus, onBlur };
const cols = {
    Resizible: { ...defaults },
    'Resizible + Focused': { ...defaults, focused: true },
    'Resizible + Disabled': { ...defaults, disabled: true },
    Auto: { ...defaults, resizible: false },
    Squared: { ...defaults, square: true, text: '' },
    'Squared + Focused': { ...defaults, square: true, focused: true, text: '' },
    Circle: { ...defaults, square: true, text: '', pin: 'circle-circle' },
    'Circle + Focused': { ...defaults, square: true, text: '', focused: true, pin: 'circle-circle' },
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
