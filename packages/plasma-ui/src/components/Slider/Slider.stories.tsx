import React from 'react';
import styled from 'styled-components';

import { InSpacingDecorator } from '../../helpers';

import { Slider } from './Slider';
import { SliderProps } from './Single';

export default {
    title: 'Controls/Slider',
    component: Slider,
    decorators: [InSpacingDecorator],
    argTypes: {
        onChangeCommitted: { action: 'onChangeCommitted' },
        onChange: { action: 'onChange' },
    },
};

const SliderWrapper = styled.div`
    width: 25rem;
`;

const SliderDefault: React.FC<SliderProps> = (args) => {
    return (
        <SliderWrapper>
            <Slider {...args} />
        </SliderWrapper>
    );
};

export const Default = SliderDefault.bind({});

Default.args = {
    min: 0,
    max: 100,
    value: 30,
    disabled: false,
};

export const MultipleValues = SliderDefault.bind({});

MultipleValues.args = {
    min: 0,
    max: 100,
    value: [10, 80],
    disabled: false,
};
