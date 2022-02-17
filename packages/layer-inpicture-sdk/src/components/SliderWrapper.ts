import { html } from 'htm/preact';
import { useRef } from 'preact/compat';

import { Product } from '../types';

import { Slide } from './Slide';
import { SliderButtons } from './SliderButtons';

type Props = {
    products: Product[];
    onSlideHover: (isHover: boolean) => void;
    name: string;
};

export const SliderWrapper = ({ products, onSlideHover, name }: Props) => {
    const swiperWrapperRef = useRef(null);

    return html`
        <div class="swiper-wrapper layer-swiper-wrapper" ref=${swiperWrapperRef}>
            ${products?.map(
                (product: Product, index) => html`
                    <${Slide}
                        key=${index}
                        index=${index}
                        product=${product}
                        name=${name}
                        amount=${products.length}
                        onSlideHover=${onSlideHover}
                    />
                `,
            )}
        </div>
    `;
};
