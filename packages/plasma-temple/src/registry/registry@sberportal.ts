import { ItemMainSection } from '../pages/ItemPage/components/ItemMainSection/ItemMainSection@sberportal';
import { ItemEntities } from '../pages/ItemPage/components/ItemEntities/ItemEntities@sberportal';
import { NavCol } from '../pages/ShopLandingPage/components/NavCol/NavCol@sberportal';
import { Carousel } from '../pages/GalleryPage/components/Carousel@sberportal';
import { HeroSliderSberportal as Slider } from '../components/HeroSlider/HeroSlider@sberportal';
import { StateLayoutSberPortal as StateLayout } from '../components/StateLayout/StateLayout@sberportal';

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
