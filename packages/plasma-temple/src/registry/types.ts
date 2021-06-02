import React from 'react';

import type { ItemMainSectionProps } from '../pages/ItemPage/components/ItemMainSection/ItemMainSection';
import type { ItemEntitiesProps } from '../pages/ItemPage/components/ItemEntities/ItemEntities';
import type { NavColProps } from '../pages/ShopLandingPage/components/NavCol/NavCol';
import type { CarouselProps } from '../pages/GalleryPage/components/Carousel';
import { HeroSliderProps } from '../components/HeroSlider';

export type UnifiedComponentProps<T, K extends string> = T & {
    platformComponents: Record<K, React.ComponentType<any>>;
};

export interface Registry {
    ItemMainSection: React.ComponentType<ItemMainSectionProps>;
    ItemEntities: React.ComponentType<ItemEntitiesProps>;
    NavCol: React.ComponentType<NavColProps>;
    Carousel: React.ForwardRefExoticComponent<
        React.PropsWithChildren<CarouselProps> & React.RefAttributes<HTMLDivElement>
    >;
    Slider: React.ComponentType<HeroSliderProps>;
}
