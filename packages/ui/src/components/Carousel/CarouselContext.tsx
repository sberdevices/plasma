import React from 'react';

import { PickOptional } from '../../types';

import type { CarouselProps } from './Carousel';

/**
 * Хранилище элементов карусели.
 */
export class CarouselItemRefs {
    public items: React.MutableRefObject<HTMLElement | null>[] = [];

    public register(ref: React.MutableRefObject<HTMLElement | null>): number {
        return this.items.push(ref) - 1;
    }

    public unregister(ref: React.MutableRefObject<HTMLElement | null>) {
        this.items.splice(this.items.indexOf(ref), 1);
    }
}

export interface CarouselContextType extends PickOptional<CarouselProps, 'axis'> {
    refs?: CarouselItemRefs;
}

const carouselContextDefaultValue: CarouselContextType = {
    axis: 'x',
};

export const CarouselContext = React.createContext<CarouselContextType>(carouselContextDefaultValue);
