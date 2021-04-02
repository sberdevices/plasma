import React, { useState } from 'react';
import { number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconMinus, IconPlus, IconClose } from '@sberdevices/plasma-icons';

import { actionWithPersistedEvent, ShowcaseComponentRow } from '../../helpers';

import { Pin } from './StepperButton';

import { Stepper, StepperRoot, StepperButton, StepperValue } from '.';

const onChangeAction = action('onChange');
const onRemoveAction = actionWithPersistedEvent('onRemove');
const onFocusAction = actionWithPersistedEvent('onFocus');
const onBlurAction = actionWithPersistedEvent('onBlur');

const items = [
    { min: 0, max: 5, remover: true, pin: 'circle-circle' },
    { min: 0, max: 5, remover: true, pin: 'square-square' },
    { min: 0, max: 5, remover: true, pin: 'circle-circle' },
    { min: 0, max: 5, remover: true, pin: 'square-square' },
    { min: 0, max: 3, remover: true, pin: 'circle-circle' },
    { min: 0, max: 3, remover: true, pin: 'square-square' },
];

export const Default = () => {
    const [values, setValues] = useState<Record<number, number>>({
        0: 2,
        1: 2,
        2: 0,
        3: 0,
        4: 3,
        5: 3,
    });

    return (
        <>
            {items.map((item, i) => (
                <ShowcaseComponentRow key={`item:${i}`}>
                    <Stepper
                        step={1}
                        value={values[i]}
                        min={item.min}
                        max={item.max}
                        showRemove={item.remover}
                        pin={item.pin as Pin}
                        onChange={(value) => {
                            setValues({ ...values, [i]: value });
                            onChangeAction(value);
                        }}
                        onRemove={onRemoveAction}
                        onFocus={onFocusAction}
                        onBlur={onBlurAction}
                    />
                </ShowcaseComponentRow>
            ))}
        </>
    );
};

export const CustomAssembly = () => {
    const [value, setValue] = useState(5);
    const step = number('step', 1);
    const min = number('min', 1);
    const max = number('max', 10);
    return (
        <StepperRoot>
            <StepperButton
                view={value > min ? 'secondary' : 'critical'}
                icon={value > min ? <IconMinus color="inherit" size="xs" /> : <IconClose color="inherit" size="xs" />}
                onClick={() => setValue(Math.max(value - step, min))}
            />
            <StepperValue
                value={value}
                disabled={boolean('valueDisabled', false)}
                showWarning={boolean('customWarning', false)}
            />
            <StepperButton
                view="secondary"
                icon={<IconPlus color="inherit" size="xs" />}
                disabled={value >= max}
                onClick={() => setValue(Math.min(value + step, max))}
            />
        </StepperRoot>
    );
};

CustomAssembly.parameters = {
    chromatic: {
        disable: true,
    },
};
