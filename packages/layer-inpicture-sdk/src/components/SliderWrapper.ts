import { html } from 'htm/preact';

import { Product } from '../types';

import { Slide } from './Slide';

type Props = {
    products: Product[];
    onSlideHover: (isHover: boolean) => void;
    name: string;
}

export const SliderWrapper = ({ products, onSlideHover, name }: Props) => {
    return html`
        <div class="swiper-wrapper layer-swiper-wrapper">
            ${products?.map((product: Product, index) => html`
                <${Slide} key=${index} name=${name} product=${product} onSlideHover=${onSlideHover}/>
            `)}
        </div>
    `;
};
