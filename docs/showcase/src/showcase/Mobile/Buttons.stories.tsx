import React from 'react';
import { Button } from '@sberdevices/ui/components/Button';

import { ButtonShowcase } from '../../helpers';

export default {
    title: 'Showcase/Mobile',
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const sections = [
    { title: 'Button S 40', subTitle: 'Кнопки размера 40', panel: true, props: { size: 's' } },
    { title: 'Button M 48', subTitle: 'Кнопки размера 48', panel: true, props: { size: 'm' } },
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
const defaults = { focused: false, disabled: false, resizible: true, text: 'Label' };
const cols = {
    Normal: { ...defaults },
    'Normal + Disabled': { ...defaults, disabled: true },
    Auto: { ...defaults, resizible: false },
    'Auto + Disabled': { ...defaults, resizible: false, disabled: true },
    Squared: { ...defaults, square: true, text: '' },
    Circle: { ...defaults, square: true, text: '', pin: 'circle-circle' },
};

export const Buttons = () => (
    <ButtonShowcase
        sections={sections}
        rows={rows}
        cols={cols}
        columns="repeat(2, 13.75rem) repeat(4, max-content)"
        component={Button}
    />
);
