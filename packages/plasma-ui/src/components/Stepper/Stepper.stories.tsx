import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
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

export default {
    title: 'Controls/Stepper',
} as Meta;

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

interface CustomAssemblyProps {
    step: number;
    min: number;
    max: number;
    disabled: boolean;
    showWarning: boolean;
    showFormat: boolean;
}

export const CustomAssembly: Story<CustomAssemblyProps> = ({ step, min, max, disabled, showWarning, showFormat }) => {
    const [value, setValue] = useState(5);
    const formatter = (val: number) => `${val}$`;
    return (
        <StepperRoot>
            <StepperButton
                view={value > min ? 'secondary' : 'critical'}
                icon={value > min ? <IconMinus color="inherit" size="xs" /> : <IconClose color="inherit" size="xs" />}
                onClick={() => setValue(Math.max(value - step, min))}
            />
            <StepperValue
                value={value}
                disabled={disabled}
                showWarning={showWarning}
                formatter={showFormat && formatter}
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

CustomAssembly.args = {
    step: 1,
    min: 1,
    max: 10,
    disabled: false,
    showWarning: false,
    showFormat: false,
};

CustomAssembly.parameters = {
    chromatic: {
        disable: true,
    },
};
