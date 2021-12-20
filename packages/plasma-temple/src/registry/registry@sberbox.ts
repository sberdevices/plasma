import { ItemMainSection } from '../pages/ItemPage/components/ItemMainSection/ItemMainSection@sberbox';
import { ItemEntities } from '../pages/ItemPage/components/ItemEntities/ItemEntities@sberbox';
import { NavCol } from '../pages/ShopLandingPage/components/NavCol/NavCol@sberbox';
import { Carousel } from '../pages/GalleryPage/components/Carousel@sberbox';
import { HeroSliderSberbox as Slider } from '../components/HeroSlider/HeroSlider@sberbox';
import { StateLayoutSberBox as StateLayout } from '../components/StateLayout/StateLayout@sberbox';

import { Registry } from './types';

const registry: Registry = {
    ItemEntities,
    ItemMainSection,
    NavCol,
    Carousel,
    Slider,
    StateLayout,
};

export default registry;
