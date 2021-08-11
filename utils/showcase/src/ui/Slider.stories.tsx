import React from 'react';
import { Slider } from '@sberdevices/plasma-ui/components/Slider';

import { SliderShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Slider',
    component: Slider,
    decorators: [UIStoryDecorator, InSpacingDecorator],
    argTypes: {
        onChangeCommitted: { action: 'onChangeCommitted' },
        onChange: { action: 'onChange' },
    },
};

interface SliderShowcaseProps {
    onChangeCommitted(value: number | number[]): void;
    onChange(value: number | number[]): void;
}

export const Default = ({ onChangeCommitted, onChange }: SliderShowcaseProps) => {
    return <SliderShowcase onChangeCommitted={onChangeCommitted} onChange={onChange} />;
};
