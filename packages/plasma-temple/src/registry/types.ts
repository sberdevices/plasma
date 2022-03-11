import React from 'react';

import type { ItemEntitiesProps } from '../pages/ItemPage/components/ItemEntities/ItemEntities';
import type { NavColProps } from '../pages/ShopLandingPage/components/NavCol/NavCol';
import type { CarouselProps } from '../pages/GalleryPage/components/Carousel';
import type { HeroSliderProps } from '../components/HeroSlider';
import type { StateLayoutProps } from '../components/StateLayout';

type EmptyObject = Record<never, never>;

export type UnifiedComponentProps<T, P extends Record<string, unknown>> = T & {
    platformComponents: { [K in keyof P]: React.ComponentType<P[K] extends void | never ? EmptyObject : P[K]> };
};

export interface Registry {
    ItemEntities: React.ComponentType<ItemEntitiesProps>;
    NavCol: React.ComponentType<NavColProps>;
    Carousel: React.ForwardRefExoticComponent<
        React.PropsWithChildren<CarouselProps> & React.RefAttributes<HTMLDivElement>
    >;
    Slider: React.ComponentType<HeroSliderProps>;
    StateLayout: React.ComponentType<StateLayoutProps>;
    FocusableGalleryTitle: React.ComponentType<{}>;
}
