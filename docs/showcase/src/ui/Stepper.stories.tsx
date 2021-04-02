import React from 'react';
import { Stepper } from '@sberdevices/plasma-ui/components/Stepper';

import { actionWithPersistedEvent, ShowcaseComponentRow, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Stepper',
    component: Stepper,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const onChange = actionWithPersistedEvent('onChange');
const onRemove = actionWithPersistedEvent('onRemove');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

type Pin = 'circle-circle' | 'square-square';

const items = [
    { min: 0, max: 5, remover: true, pin: 'circle-circle' },
    { min: 0, max: 5, remover: true, pin: 'square-square' },
    { min: 0, max: 5, remover: true, pin: 'circle-circle' },
    { min: 0, max: 5, remover: true, pin: 'square-square' },
    { min: 0, max: 123, remover: true, pin: 'circle-circle' },
    { min: 0, max: 45678, remover: true, pin: 'square-square' },
];

export const Default = () => {
    const [values, setValues] = React.useState<Record<number, number>>({
        0: 2,
        1: 2,
        2: 0,
        3: 0,
        4: 123,
        5: 45678,
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
                        pin={item.pin as Pin}
                        showRemove={item.remover}
                        onChange={(value) => {
                            setValues({ ...values, [i]: value });
                            onChange(value as any);
                        }}
                        onRemove={onRemove}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </ShowcaseComponentRow>
            ))}
        </>
    );
};
