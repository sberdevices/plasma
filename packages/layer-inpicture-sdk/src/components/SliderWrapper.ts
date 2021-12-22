import { html } from 'htm/preact';

import { Product } from '../types';

import { Slide } from './Slide';

type Props = {
    products: Product[];
    onSlideHover: (isHover: boolean) => void;
}

export const SliderWrapper = ({ products, onSlideHover }: Props) => {
    return html`
        <div class="swiper-wrapper layer-swiper-wrapper">
            ${products?.map((product: Product, index) => html`
                <${Slide} key=${product?.id || index} product=${product} onSlideHover=${onSlideHover}/>
            `)}
        </div>
    `;
};
