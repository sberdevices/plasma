import React from 'react';
import type { PickOptional } from '@sberdevices/plasma-core/types';

import type { CarouselProps } from './Carousel';

/**
 * Хранилище элементов карусели.
 */
export class CarouselItemRefs {
    public items: React.MutableRefObject<HTMLElement | null>[] = [];

    private order() {
        const children = this.items.find((item) => item.current?.parentNode?.children)?.current?.parentNode?.children;

        if (!children) {
            return;
        }

        const childrenArray = Array.from(children);

        this.items.sort((a, b) => {
            if (a.current?.parentNode?.children && b.current?.parentNode?.children) {
                return childrenArray.indexOf(a.current) - childrenArray.indexOf(b.current);
            }
            return 0;
        });
    }

    public register(ref: React.MutableRefObject<HTMLElement | null>): number {
        this.items.push(ref);
        this.order();

        return this.items.length - 1;
    }

    public unregister(ref: React.MutableRefObject<HTMLElement | null>) {
        this.items.splice(this.items.indexOf(ref), 1);
        this.order();
    }
}

export interface CarouselContextType extends PickOptional<CarouselProps, 'axis'> {
    refs?: CarouselItemRefs;
}

const carouselContextDefaultValue: CarouselContextType = {
    axis: 'x',
};

export const CarouselContext = React.createContext<CarouselContextType>(carouselContextDefaultValue);
