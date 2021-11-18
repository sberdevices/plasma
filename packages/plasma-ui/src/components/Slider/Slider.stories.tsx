import React, { useState } from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react';

import { InSpacingDecorator } from '../../helpers';

import { Slider } from './Slider';
import { SliderProps } from './Single';

export default {
    title: 'Controls/Slider',
    component: Slider,
    decorators: [InSpacingDecorator],
    argTypes: {
        onChange: { action: 'onChange' },
    },
};

const SliderWrapper = styled.div`
    width: 25rem;
`;

export const Default: Story<SliderProps> = (args) => {
    const [value, setValue] = useState(30);

    const onChangeCommittedHandle = (values) => {
        setValue(values);
    };

    return (
        <SliderWrapper>
            <Slider value={value} onChangeCommitted={onChangeCommittedHandle} {...args} />
        </SliderWrapper>
    );
};

Default.args = {
    min: 0,
    max: 100,
    disabled: false,
};

export const MultipleValues: Story<SliderProps> = (args) => {
    const [value, setValue] = useState([10, 80]);

    const onChangeCommittedHandle = (values) => {
        setValue(values);
    };

    return (
        <SliderWrapper>
            <Slider value={value} onChangeCommitted={onChangeCommittedHandle} {...args} />
        </SliderWrapper>
    );
};

MultipleValues.args = {
    min: 0,
    max: 100,
    disabled: false,
};
