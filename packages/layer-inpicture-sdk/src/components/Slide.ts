import { html } from 'htm/preact';
import { useContext } from 'preact/compat';
import classNames from 'classnames';

import { Product, TemplateEnum } from '../types';
import stub from '../assets/stub.svg';
import { sendProductClickEvent } from '../api/requsts';
import { adaptiveValue } from '../utils/adaptiveValue';

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
    const config = useContext(ConfigContext);
    const { template } = config;

    const onSlideClick = (event: MouseEvent) => {
        event.stopPropagation();

        sendProductClickEvent({ ...config, product: { ...product, index, amount } });

        window.open(`${product.url}?utm=${name}`, '_blank');
    };

    let productName = product?.name;

    if (template === TemplateEnum.MINIMAL) {
        productName = product?.name.split(' ').at(0);
    }

    return html`
        <div
            class="swiper-slide layer-swiper-slide layer-unselectable"
            onClick=${onSlideClick}
            onMouseEnter=${() => onSlideHover(true)}
            onMouseLeave=${() => onSlideHover(false)}
        >
            ${product ? html`
                <img src=${product.pic} alt="product"/>` : html`<img src=${stub} alt="stub"/>`}
                <div class=${classNames('layer-swiper-slide-bottom', {
                    'layer-swiper-slide-bottom_stub': !product,
                    'layer-swiper-slide-bottom_secondary': template === TemplateEnum.LARGE,
                })}>
                ${product ? html`
                    <div class="layer-swiper-slide-bottom__shop-name">${product.retailer.name}</div>` : ''}
                    <div class="layer-swiper-slide-bottom__bg">
                    ${product ?
                        html`<div class=${classNames('layer-swiper-slide-bottom__name', {
                            'layer-swiper-slide-bottom__name_minimal': template === TemplateEnum.MINIMAL,
                        })}>${productName}</div>`
                        :
                        html`<div class="layer__sketelon layer-mb-6"></div>
                             <div class="layer__sketelon layer-mb-6"></div>`
                    }
                    ${product ? html`
                        <div class="layer-swiper-slide-bottom__price">${format(product?.price)} ₽</div>` : html`
                        <div class="layer__sketelon layer-w-50"></div>`}
                </div>
            </div>
        </div>
    `;
};
