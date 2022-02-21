import { useCallback, useEffect, useRef, useState } from 'preact/compat';
import { html } from 'htm/preact';
import Swiper from 'swiper';
import { createContext } from 'preact';
import classNames from 'classnames';

import { Config, Product, TemplateEnum } from '../types';
import { loadProducts, sendOpenedWidgetEvent, sendShowWidgetEvent } from '../api';
import { useOnceForceUpdate } from '../utils/hooks/useOnceForceUpdate';
import { useInView } from '../utils/hooks/useInView';

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

const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const { width } = entry.contentRect;

        if (width < 320) {
            (entry.target as HTMLElement).style.visibility = 'hidden';
        } else {
            (entry.target as HTMLElement).style.visibility = 'visible';
        }
    }
});

export const ConfigContext = createContext<Config>(null);

export const Container = (config: Config) => {
    const {
        template = TemplateEnum.INTERACTIVE,
        hiddenByDefault = false,
        image,
        withSkeleton,
        container,
        site,
        maxCount,
    } = config;

    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState<Product[] | null | SKELETON_LIST>(withSkeleton ? SKELETON_LIST : null);
    const [isPrimaryTitleShow, setIsPrimaryTitleShow] = useState(true);
    const [isShowPrimaryWidget, toggleShowingPrimaryWidget] = useState(
        !hiddenByDefault || template === TemplateEnum.LARGE,
    );
    const isWidgetClickOpenTabEventAlreadySent = useRef(null);

    const wrapperRef = useRef(null);
    const containerRef = useRef(container);
    const topContentRef = useRef(null);

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

    const handleWidgetInView = useCallback(() => {
        if (!hiddenByDefault || template === TemplateEnum.LARGE) {
            sendOpenedWidgetEvent(config);
        } else {
            sendShowWidgetEvent(config);
        }
    }, [config, template, hiddenByDefault]);

    const [initInViewObserver] = useInView({ threshold: 1 }, handleWidgetInView);

    useEffect(() => {
        if (products !== null) {
            initInViewObserver(template === TemplateEnum.MINIMAL ? topContentRef.current : wrapperRef.current);
            ro.observe(wrapperRef.current);
            containerRef.current.style.height = `${wrapperRef.current?.clientHeight}px`;
            containerRef.current.style.visibility = 'visible';
            getSliderInstance();
        }
    }, [products, image, template, initInViewObserver]);

    const onPrimaryHeaderClick = (event: MouseEvent) => {
        event.stopPropagation();

        if (
            (template === TemplateEnum.MINIMAL || template === TemplateEnum.INTERACTIVE) &&
            !isWidgetClickOpenTabEventAlreadySent.current &&
            hiddenByDefault
        ) {
            sendOpenedWidgetEvent(config);
            isWidgetClickOpenTabEventAlreadySent.current = true;
        }

        toggleShowingPrimaryWidget((prev) => !prev);
    };

    if (isError || !products?.length) {
        return null;
    }

    onceForceUpdate();

    const drawerStyle =
        !isShowPrimaryWidget && `transform: translateY(${(wrapperRef.current?.clientHeight || 1000) - 48}px);`;

    return html`
        <${ConfigContext.Provider} value=${config}>
            <div
                ref=${wrapperRef}
                class=${classNames('layer-hidden layer-content', {
                    'layer-primary-wrap': template === TemplateEnum.INTERACTIVE,
                    'layer-secondary-wrap': template === TemplateEnum.LARGE,
                    'layer-minimal-wrap': template === TemplateEnum.MINIMAL,
                })}
            >
                <div class="layer-content__drawer" style=${drawerStyle}>
                    ${
                        template === TemplateEnum.INTERACTIVE || template === TemplateEnum.MINIMAL
                            ? html`<${PrimaryTopContent}
                                  ref=${topContentRef}
                                  isShow=${template === TemplateEnum.MINIMAL || isPrimaryTitleShow}
                                  isOpen=${isShowPrimaryWidget}
                                  onPrimaryHeaderClick=${onPrimaryHeaderClick}
                              />`
                            : html`<${SecondaryTopContent} />`
                    }
                    <div
                        class="layer-main-container"
                    >
                        <${SliderWrapper}
                            products=${products}
                            name=${site}
                            onSlideHover=${(isHover: boolean) => setIsPrimaryTitleShow(!isHover)}
                        />
                        <${SliderButtons} />
                    </div>
                </div>
            </div>
        </EXTERNAL_FRAGMENT>
    `;
};
