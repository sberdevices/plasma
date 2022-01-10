import { useEffect, useRef, useState } from 'preact/compat';
import { html } from 'htm/preact';
import Swiper from 'swiper';

import { Config, Product } from '../types';
import { loadProducts } from '../api/requsts';

import { PrimaryTopContent } from './PrimaryTopContent';
import { SecondaryTopContent } from './SecondaryTopContent';
import { SliderWrapper } from './SliderWrapper';
import { SliderButtons } from './SliderButtons';

const SKELETON_LIST = Array.from({ length: 6 });
type SKELETON_LIST = typeof SKELETON_LIST;

const getSliderInstance = () => {
    // eslint-disable-next-line no-new
    new Swiper('.layer-main-container', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.layer-swiper-button-next',
            prevEl: '.layer-swiper-button-prev',
        },
    });
};

export const Container = ({ template = 'primary', image, withSkeleton, container, site }: Config) => {
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState<Product[] | null | SKELETON_LIST>(withSkeleton ? SKELETON_LIST : null);
    const [isPrimaryTitleShow, setIsPrimaryTitleShow] = useState(true);
    const wrapperRef = useRef(null);
    const containerRef = useRef(container);

    useEffect(() => {
        const load = async () => {
            try {
                const productsList = await loadProducts(image, site);
                setProducts(productsList);
            } catch {
                setIsError(true);
                throw new Error('произошла ошибка при получении товара');
            }
        };
        load();
    }, [image, site]);

    useEffect(() => {
        if (products !== null) {
            containerRef.current.style.height = `${wrapperRef.current?.clientHeight}px`;
            containerRef.current.style.visibility = 'visible';
            getSliderInstance();
        }
    }, [products]);

    if (isError || !products?.length) {
        return null;
    }

    return html`
        <div class=${`layer-hidden layer-content${template === 'primary' ? '' : ' layer-secondary-wrap'}`} ref=${wrapperRef}>
            <div class="layer-main-container">
                ${template === 'primary' ? html`<${PrimaryTopContent} isShow=${isPrimaryTitleShow} />` : html`<${SecondaryTopContent} />`}
                <${SliderWrapper} products=${products} name=${site} onSlideHover=${(isHover: boolean) => setIsPrimaryTitleShow(!isHover)}/>
                <${SliderButtons} />
            </div>
        </div>
    `;
};
