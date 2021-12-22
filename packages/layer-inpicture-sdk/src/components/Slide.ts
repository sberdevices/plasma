import { html } from 'htm/preact';

import { Product } from '../types';
import { adaptiveValue } from '../utils/adaptiveValue';
import stub from '../assets/stub.svg';

const format = (num: number) => new Intl.NumberFormat('ru-RU').format(num);

export const Slide = ({ product, onSlideHover }: { product?: Product, onSlideHover: (isHover: boolean) => void; }) => html`
    <div
        class="swiper-slide layer-swiper-slide layer-unselectable"
        style=${{ width: adaptiveValue(94, 74), height: adaptiveValue(138, 108) }}
        onClick=${(event: any) => {
            event.stopPropagation();
            window.open(product.url, '_blank');
        }}
        onMouseEnter=${() => onSlideHover(true)}
        onMouseLeave=${() => onSlideHover(false)}
    >
        ${product ? html`<img src=${product.pic} alt="product"/>` : html`<img src=${stub} alt="stub"/>`}
        <div class="layer-swiper-slide-bottom${product ? '' : ' layer-swiper-slide-bottom_stub'}">
            ${product ? html`<div class="layer-swiper-slide-bottom__shop-name">${product.retailer.name}</div>` : ''}
            <div class="layer-swiper-slide-bottom__bg">
                ${product ? html`<div class="layer-swiper-slide-bottom__name">${product.name}</div>` : html`<div class="layer__sketelon layer-mb-6"></div><div class="layer__sketelon layer-mb-6"></div>`}
                ${product ? html`<div class="layer-swiper-slide-bottom__price">${format(product?.price)} ₽</div>` : html`<div class="layer__sketelon layer-w-50"></div>`}
            </div>
        </div>
    </div>
`;
