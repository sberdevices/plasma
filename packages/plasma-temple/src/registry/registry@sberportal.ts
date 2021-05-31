import { ItemMainSection } from '../pages/ItemPage/components/ItemMainSection/ItemMainSection@sberportal';
import { ItemEntities } from '../pages/ItemPage/components/ItemEntities/ItemEntities@sberportal';
import { NavCol } from '../pages/ShopLandingPage/components/NavCol/NavCol@sberportal';
import { Carousel } from '../pages/GalleryPage/components/Carousel@sberportal';
import { HeroSlide } from '../components/HeroSlide/HeroSlide@sberportal';

import { Registry } from './types';

const registry: Registry = {
    ItemEntities,
    ItemMainSection,
    NavCol,
    Carousel,
    HeroSlide,
};

export default registry;
