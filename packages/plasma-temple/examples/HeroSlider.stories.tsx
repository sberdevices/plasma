import { action } from '@storybook/addon-actions';
import React from 'react';

import { HeroSlider } from '../src/components/HeroSlider/HeroSlider';

export default {
    title: 'Components/HeroSlider',
};

const items = Array.from({ length: 6 }, (_, index) => ({
    title: index % 2 === 0 ? 'Почему кошки так долго спят?' : 'Правда ли, что попугаи умеют разговаривать?',
    src: index % 2 === 0 ? './images/cat.png' : './images/parrot.png',
    id: index,
}));

export const Default: React.FC = () => (
    <HeroSlider time={2000} onItemClick={action('onClick')} items={items} buttonText="Click To" />
);
