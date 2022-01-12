import { html } from 'htm/preact';
import { useContext } from 'preact/compat';

import { Product } from '../types';
import { adaptiveValue } from '../utils/adaptiveValue';
import stub from '../assets/stub.svg';
import { sendProductClickEvent } from '../api/requsts';

import { ConfigContext } from './Container';

const format = (num: number) => new Intl.NumberFormat('ru-RU').format(num);

type Props = {
    product?: Product,
    name: string,
    onSlideHover: (isHover: boolean) => void;
    index: number;
    amount: number;
}

export const Slide = ({ product, onSlideHover, name, index, amount }: Props) => {
    const { image, site } = useContext(ConfigContext);

    const onSlideClick = (event: MouseEvent) => {
        event.stopPropagation();

        sendProductClickEvent({ image, site, product: { ...product, index, amount } });

        window.open(`${product.url}?utm=${name}`, '_blank');
    };

    return html`
        <div
            class="swiper-slide layer-swiper-slide layer-unselectable"
            style=${{ width: adaptiveValue(94, 74), height: adaptiveValue(138, 108) }}
            onClick=${onSlideClick}
            onMouseEnter=${() => onSlideHover(true)}
            onMouseLeave=${() => onSlideHover(false)}
        >
            ${product ? html`<img src=${product.pic} alt="product"/>` : html`<img src=${stub} alt="stub"/>`}
            <div class="layer-swiper-slide-bottom${product ? '' : ' layer-swiper-slide-bottom_stub'}">
                ${product ? html`
                    <div class="layer-swiper-slide-bottom__shop-name">${product.retailer.name}</div>` : ''}
                <div class="layer-swiper-slide-bottom__bg">
                    ${product ? html`
                        <div class="layer-swiper-slide-bottom__name">${product.name}</div>` : html`
                        <div class="layer__sketelon layer-mb-6"></div>
                        <div class="layer__sketelon layer-mb-6"></div>`}
                    ${product ? html`
                        <div class="layer-swiper-slide-bottom__price">${format(product?.price)} ₽</div>` : html`
                        <div class="layer__sketelon layer-w-50"></div>`}
                </div>
            </div>
        </div>
    `;
};
