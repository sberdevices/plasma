import { html } from 'htm/preact';

import { Product } from '../types';

import { Slide } from './Slide';

type Props = {
    products: Product[]
}

export const SliderWrapper = ({ products }: Props) => html`
    <div class="swiper-wrapper layer-swiper-wrapper">
        ${products?.map((product: Product, index) => html`
            <${Slide} key=${product?.id || index} product=${product} />
        `)}
    </div>
`;
