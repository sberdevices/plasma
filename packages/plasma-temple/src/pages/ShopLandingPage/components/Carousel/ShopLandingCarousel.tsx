import React from 'react';

import { DeviceFamily } from '../../../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

import { ShopLandingCarouselSberBox } from './ShopLandingCarousel@sberbox';
import { ShopLandingCarouselSberPortal } from './ShopLandingCarousel@sberportal';
import { ShopLandingCarouselProps } from './types';

const mapDeviceToCarousel: Record<
    DeviceFamily,
    React.ForwardRefExoticComponent<ShopLandingCarouselProps & React.RefAttributes<HTMLDivElement>>
> = {
    sberBox: ShopLandingCarouselSberBox,
    sberPortal: ShopLandingCarouselSberPortal,
    mobile: ShopLandingCarouselSberPortal,
};

export const ShopLandingCarousel = mapDeviceToCarousel[deviceFamily];
