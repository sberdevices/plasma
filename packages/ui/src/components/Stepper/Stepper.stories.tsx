import React, { useState } from 'react';
import { number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { IconMinus, IconPlus } from '../Icon';

import { Stepper, StepperRoot, StepperButton, StepperValue } from './Stepper';

export default {
    title: 'Stepper',
    component: Stepper,
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => {
    const [value, setValue] = useState(number('value', 5));
    return (
        <Stepper
            disabled={boolean('disabled', false)}
            value={value}
            step={number('step', 1)}
            min={number('min', 1)}
            max={number('max', 10)}
            remover={boolean('remover', true)}
            onChange={(v) => setValue(v)}
            onRemove={action('onRemove')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    );
};

export const Custom = () => {
    const [value, setValue] = useState(5);
    const step = number('step', 1);
    const min = number('min', 1);
    const max = number('max', 10);
    return (
        <StepperRoot>
            <StepperButton
                view={value > min ? 'primary' : 'critical'}
                icon={<IconMinus />}
                onClick={() => setValue(value - step)}
            />
            <StepperValue
                value={value}
                disabled={boolean('valueDisabled', false)}
                isWarning={boolean('customWarning', false)}
            />
            <StepperButton
                view="primary"
                icon={<IconPlus />}
                disabled={value >= max}
                onClick={() => setValue(value + step)}
            />
        </StepperRoot>
    );
};
