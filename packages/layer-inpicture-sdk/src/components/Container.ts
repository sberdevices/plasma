import { useCallback, useEffect, useRef, useState } from 'preact/compat';
import { html } from 'htm/preact';
import Swiper from 'swiper';
import { createContext } from 'preact';
import classNames from 'classnames';

import { Config, Product, TemplateEnum } from '../types';
import { loadProducts, sendOpenedWidgetEvent, sendShowWidgetEvent } from '../api/requsts';
import { useOnceForceUpdate } from '../utils/hooks/useOnceForceUpdate';

import { PrimaryTopContent } from './PrimaryTopContent';
import { SecondaryTopContent } from './SecondaryTopContent';
import { SliderWrapper } from './SliderWrapper';
import { SliderButtons } from './SliderButtons';

const SKELETON_LIST = Array.from({ length: 6 });
type SKELETON_LIST = typeof SKELETON_LIST;

const getSliderInstance = () => {
    return new Swiper('.layer-main-container', {
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.layer-swiper-button-next',
            prevEl: '.layer-swiper-button-prev',
        },
    });
};

const widgetsMap = new Map<Element, Config>();

const options: IntersectionObserverInit = {
    root: null,
    threshold: 1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            sendShowWidgetEvent(widgetsMap.get(entry.target));
            observer.unobserve(entry.target);
        }
    });
}, options);

export const ConfigContext = createContext<Config>(null);

export const Container = (config: Config) => {
    const { template = TemplateEnum.INTERACTIVE, image, withSkeleton, container, site, maxCount } = config;

    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState<Product[] | null | SKELETON_LIST>(withSkeleton ? SKELETON_LIST : null);
    const [isPrimaryTitleShow, setIsPrimaryTitleShow] = useState(true);
    const [isShowPrimaryWidget, toggleShowingPrimaryWidget] = useState(template !== TemplateEnum.MINIMAL);
    const isMinimalWidgetEventAlreadySent = useRef(null);

    const wrapperRef = useRef(null);
    const containerRef = useRef(container);

    const onceForceUpdate = useOnceForceUpdate();

    useEffect(() => {
        const load = async () => {
            try {
                const productsList = await loadProducts(image, site, maxCount);
                setProducts(productsList);
            } catch {
                setIsError(true);
                throw new Error('Произошла ошибка при получении товара');
            }
        };
        load();
    }, [image, site, maxCount]);

    const observe = useCallback((element: Element) => {
        widgetsMap.set(element, config);
        observer.observe(element);
    }, [config]);

    useEffect(() => {
        if (products !== null) {
            template !== TemplateEnum.MINIMAL && observe(wrapperRef.current);
            containerRef.current.style.height = `${wrapperRef.current?.clientHeight}px`;
            containerRef.current.style.visibility = 'visible';
            getSliderInstance();
        }
    }, [products, image, observe, template]);

    const onPrimaryHeaderClick = () => {
        if (template === TemplateEnum.MINIMAL && !isMinimalWidgetEventAlreadySent.current) {
            sendOpenedWidgetEvent(config);
            sendShowWidgetEvent(config);
            isMinimalWidgetEventAlreadySent.current = true;
        }

        toggleShowingPrimaryWidget((prev) => !prev);
    };

    if (isError || !products?.length) {
        return null;
    }

    onceForceUpdate();

    return html`
        <${ConfigContext.Provider} value=${config}>
            <div
                ref=${wrapperRef}
                class=${classNames('layer-hidden layer-content', {
                    'layer-primary-wrap': template === TemplateEnum.INTERACTIVE,
                    'layer-secondary-wrap': template === TemplateEnum.LARGE,
                })}
            >
                <div
                    class="layer-main-container"
                    style=${isShowPrimaryWidget ? '' : `transform: translateY(${(wrapperRef.current?.clientHeight || 1000) - 30}px);`}
                >
                    ${template === TemplateEnum.INTERACTIVE || template === TemplateEnum.MINIMAL
                        ? html`<${PrimaryTopContent}
                            isShow=${template === TemplateEnum.MINIMAL || isPrimaryTitleShow}
                            onPrimaryHeaderClick=${onPrimaryHeaderClick} />`
                        : html`<${SecondaryTopContent} />`}
                    <${SliderWrapper}
                        products=${products}
                        name=${site}
                        onSlideHover=${(isHover: boolean) => setIsPrimaryTitleShow(!isHover)}
                    />
                    <${SliderButtons} />
                </div>
            </div>
        </EXTERNAL_FRAGMENT>
    `;
};
