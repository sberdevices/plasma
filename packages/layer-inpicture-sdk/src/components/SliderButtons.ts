import { html } from 'htm/preact';

import arrow from '../assets/arrow.svg';

export const SliderButtons = () => html`
    <div class="swiper-button-next layer-swiper-button layer-swiper-button-next layer-unselectable">
        <img src="${arrow}" alt="arrow next"/>
    </div>
    <div class="swiper-button-prev layer-swiper-button layer-swiper-button-prev layer-unselectable">
        <img src="${arrow}" alt="arrow prev"/>
    </div>
`;
