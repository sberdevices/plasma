import { html } from 'htm/preact';
import { useEffect, useRef } from 'preact/compat';

import { Product } from '../types';

import { Slide } from './Slide';

const isInViewport = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

type Props = {
    products: Product[];
    onSlideHover: (isHover: boolean) => void;
    name: string;
}

export const SliderWrapper = ({ products, onSlideHover, name }: Props) => {
    const swiperWrapperRef = useRef(null);

    return html`
        <div class="swiper-wrapper layer-swiper-wrapper" ref=${swiperWrapperRef}>
            ${products?.map((product: Product, index) => html`
                <${Slide}
                    key=${index}
                    index=${index}
                    product=${product}
                    name=${name}
                    amount=${products.length}
                    onSlideHover=${onSlideHover}
                />
            `)}
        </div>
    `;
};
