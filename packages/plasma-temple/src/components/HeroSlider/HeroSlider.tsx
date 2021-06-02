import React from 'react';

import { useRegistry } from '../../hooks/useRegistry';

import { HeroSliderProps } from './types';

export const HeroSlider: React.FC<HeroSliderProps> = (props) => {
    const { Slider } = useRegistry();

    return <Slider {...props} />;
};
