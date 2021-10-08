import React from 'react';

import { Slider as SliderSingleValue, SliderProps as SingleSliderProps } from './Single';
import { Slider as SliderDoubleValues, SliderProps as DoubleSliderProps } from './Double';

export type SliderProps = SingleSliderProps | DoubleSliderProps;

const isSingleValueProps = (props: SliderProps): props is SingleSliderProps => typeof props.value === 'number';

/**
 * Слайдер позволяет определить числовое значение в пределах указаного промежутка. Можно указать два значения.
 * Только для СберБанк Онлайн и Сбер Салют.
 */
export const Slider: React.FC<SliderProps> = (props) => {
    if (isSingleValueProps(props)) {
        return <SliderSingleValue {...props} />;
    }
    return <SliderDoubleValues {...props} />;
};
