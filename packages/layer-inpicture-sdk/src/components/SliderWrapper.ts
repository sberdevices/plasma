import { html } from 'htm/preact';
import { useEffect, useRef } from 'preact/compat';

import { Product } from '../types';

import { Slide } from './Slide';

type Props = {
    products: Product[];
}

export const SliderWrapper = ({ products }: Props) => {
    return html`
        <div class="swiper-wrapper layer-swiper-wrapper">
            ${products?.map((product: Product, index) => html`
                <${Slide} key=${product?.id || index} product=${product} />
            `)}
        </div>
    `;
};
