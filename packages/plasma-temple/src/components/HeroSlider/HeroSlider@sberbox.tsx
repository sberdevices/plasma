import React from 'react';
import styled from 'styled-components';

import { HeroSlide } from '../HeroSlide/HeroSlide@sberbox';

import { HeroSlider as CommonSlider } from './HeroSlider@common';
import { HeroSliderProps } from './types';

const StyledWrapper = styled.div`
    display: flex;
    position: relative;

    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
    margin-bottom: -2.5rem;
`;

export const HeroSliderSberbox: React.FC<HeroSliderProps> = (props) => (
    <CommonSlider
        platformComponents={{
            Wrapper: StyledWrapper,
            Slide: HeroSlide,
        }}
        {...props}
    />
);
