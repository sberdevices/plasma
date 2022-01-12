import { useCallback, useEffect, useRef, useState } from 'preact/compat';
import { html } from 'htm/preact';
import Swiper from 'swiper';
import { createContext } from 'preact';

import { Config, Product } from '../types';
import { loadProducts, sendShowWidgetEvent } from '../api/requsts';

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

const options: IntersectionObserverInit = {
    root: null,
    threshold: 1,
};

const widgetsMap = new Map();

const callback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('event: widget is shown');

            sendShowWidgetEvent(widgetsMap.get(entry.target));
            observer.unobserve(entry.target);
        }
    });
};
const observer = new IntersectionObserver(callback, options);

export const ConfigContext = createContext<Config>(null);

export const Container = (config: Config) => {
    const { template = 'primary', image, withSkeleton, container, site } = config;

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
                throw new Error('Произошла ошибка при получении товара');
            }
        };
        load();
    }, [image, site]);

    const observe = useCallback((element: Element) => {
        widgetsMap.set(element, { image, site });
        observer.observe(element);
    }, [image, site]);

    useEffect(() => {
        if (products !== null) {
            observe(wrapperRef.current);
            containerRef.current.style.height = `${wrapperRef.current?.clientHeight}px`;
            containerRef.current.style.visibility = 'visible';
            getSliderInstance();
        }
    }, [products, image, observe]);

    if (isError || !products?.length) {
        return null;
    }

    return html`
        <${ConfigContext.Provider} value=${config}>
            <div class=${`layer-hidden layer-content${template === 'primary' ? '' : ' layer-secondary-wrap'}`} ref=${wrapperRef}>
                <div class="layer-main-container">
                    ${template === 'primary' ? html`<${PrimaryTopContent} isShow=${isPrimaryTitleShow} />` : html`<${SecondaryTopContent} />`}
                    <${SliderWrapper} products=${products} name=${site} onSlideHover=${(isHover: boolean) => setIsPrimaryTitleShow(!isHover)}/>
                    <${SliderButtons} />
                </div>
            </div>
        </EXTERNAL_FRAGMENT>
    `;
};
