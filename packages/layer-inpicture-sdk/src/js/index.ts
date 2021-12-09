import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../css/styles.sass';
import arrow from '../assets/arrow.svg';
import logo from '../assets/logo.svg';
import stub from '../assets/stub.svg';
import logoBlack from '../assets/logo-black.svg';
import { Config, Product } from '../types';

import { counter } from './counter';

Swiper.use([Navigation]);

const BASE_URL = 'https://mcrai.sberdevices.ru/v2/frame-mp';
const PLASMA_FONTS_CDN = 'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css';

const format = (num: number) => new Intl.NumberFormat('ru-RU').format(num);

const getSliderInstance = () => {
    // eslint-disable-next-line no-new
    new Swiper('.layer-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.layer-swiper-button-next',
            prevEl: '.layer-swiper-button-prev',
        },
    });
};

const images: { id: number, element: HTMLImageElement }[] = [];

const init = (config: Config, id: number) => {
    let isSliderOpen = true;

    const adaptiveValue = (maxSize: number, minSize:number) => {
        const addSize = maxSize - minSize;

        return `calc(${minSize}px + ${addSize} * ((100vw - ${320}px) / ${1920 - 320}))`;
    };

    const loadCss = (filename: string) => {
        const cssNode = document.createElement('link');

        cssNode.setAttribute('rel', 'stylesheet');
        cssNode.setAttribute('type', 'text/css');
        cssNode.setAttribute('href', filename);
        document.querySelector('head').appendChild(cssNode);
    };

    loadCss(PLASMA_FONTS_CDN);

    const onButtonClick = () => {
        const swiperContainer = document.querySelector<HTMLElement>(`#swiper-container-${id}`);

        swiperContainer.style.transform = `translateY(${isSliderOpen ? adaptiveValue(166, 137) : 0})`;
        isSliderOpen = !isSliderOpen;
    };

    const createWrapStyles = () => {
        const { image, zIndex } = config;

        let styles = `
            top:${image.y + window.scrollY}px;
            left:${image.x + window.scrollX}px;
            width: ${image.width}px;
            height: ${image.height}px;
        `.replace(/\s/g, '');

        if (zIndex != null) {
            styles += `z-index: ${zIndex}`;
        }

        return styles;
    };

    const createWrap = () => `<div id="slider-wrap-${id}" class="layer-slider-wrap" style="${createWrapStyles()}"></div>`;

    const loadProducts = async (img: HTMLImageElement) => {
        const formData = new FormData();

        const responseImg = await fetch(img.src);
        const blob = await responseImg.blob();

        formData.append('frame', blob, 'foo.jpg');

        const requestOptions = {
            method: 'POST',
            body: formData,
        };

        const response = await fetch(BASE_URL, requestOptions);
        return response.json();
    };

    const createOnImageTopContent = () => `
        <div class="layer-slider-top-content" id="slider-top-content-${id}">
            <button class="layer-find-products-btn unselectable" id="find-products-btn-${id}">Похожие товары
                <img class="layer-logo-img" src="${logo}" alt="logo"/>
                <span class="layer-logo-text">Layer</span>
            </button>
        </div>
    `;

    const createCustomContainerTopContent = () => `
        <div class="custom-top-content">
            <div class="custom-top-content__title">Похожие товары</div>
            <div class="custom-top-content__devider"></div>
            <div class="custom-top-content-logo unselectable">
                <img class="custom-top-content-logo__img" src="${logoBlack}" alt="logo"/>
                <span class="layer-logo-text">Layer</span>
            </div>
        </div>
    `;

    const createSliderWrapper = () => `<div class="swiper-wrapper layer-swiper-wrapper" id="swiper-wrapper-${id}"></div>`;

    const createSliderButtons = `
        <div class="swiper-button-next layer-swiper-button layer-swiper-button-next unselectable">
            <img src="${arrow}" alt="arrow next"/>
        </div>
        <div class="swiper-button-prev layer-swiper-button layer-swiper-button-prev unselectable">
            <img src="${arrow}" alt="arrow prev"/>
        </div>
    `;

    const createOnImgContainer = () => `
        <div class="layer-swiper-container layer-swiper" id="swiper-container-${id}">
            ${createOnImageTopContent()}
            ${createSliderWrapper()}
            ${createSliderButtons}
        </div>
    `;

    const createCustomContainer = () => `
        <div class="layer-swiper-container layer-swiper" id="swiper-container-${id}">
            ${createCustomContainerTopContent()}
            ${createSliderWrapper()}
            ${createSliderButtons}
        </div>
    `;

    const createSlide = (slideIndex: number, product?: Product) => `
        <div class="swiper-slide swiper-slide-${slideIndex} layer-swiper-slide unselectable" style="width: ${adaptiveValue(94, 74)}; height: ${adaptiveValue(138, 108)}">
            ${product ? `<img src="${product.pic}" alt="product"/>` : `<img src="${stub}" alt="stub"/>`}
            <div class="layer-swiper-slide-bottom${product ? '' : ' layer-swiper-slide-bottom_stub'}">
                ${product ? `<div class="layer-swiper-slide-bottom__shop-name">${product.retailer.name}</div>` : ''}
                <div class="layer-swiper-slide-bottom__bg">
                    ${product ? `<div class="layer-swiper-slide-bottom__name">${product.name}</div>` : '<div class="layer__sketelon mb-6"></div><div class="layer__sketelon mb-6"></div>'}
                    ${product ? `<div class="layer-swiper-slide-bottom__price">${format(product?.price)} ₽</div>` : '<div class="layer__sketelon w-50"></div>'}
                </div>
            </div>
        </div>
    `;

    const createSkeleton = () => {
        const { container } = config;

        if (config.container) {
            container.insertAdjacentHTML('afterbegin', createCustomContainer());

            const swiperWrapper = document.querySelector<HTMLElement>(`#swiper-wrapper-${id}`);

            Array.from({ length: 6 }).forEach((skeletonItem, index) => {
                swiperWrapper.insertAdjacentHTML('beforeend', createSlide(index));
            });

            getSliderInstance();
        }
    };

    const createSlider = (products: Product[]) => {
        const { image, container } = config;

        if (container) {
            container.textContent = '';
            container.insertAdjacentHTML('afterbegin', createCustomContainer());
        } else {
            const sliderWrap = document.querySelector(`#slider-wrap-${id}`);

            sliderWrap.insertAdjacentHTML('afterbegin', createOnImgContainer());
            const hideShowButton: HTMLElement = document.querySelector(`#find-products-btn-${id}`);

            hideShowButton.onclick = onButtonClick;

            const sliderTopContent = document.querySelector<HTMLElement>(`#slider-top-content-${id}`);

            const swiperWrapper = document.querySelector<HTMLElement>(`#swiper-wrapper-${id}`);
            swiperWrapper.addEventListener('mouseover', () => {
                sliderTopContent.style.visibility = 'hidden';
            });
            swiperWrapper.addEventListener('mouseout', () => {
                sliderTopContent.style.visibility = 'visible';
            });
        }

        const swiperWrapper = document.querySelector<HTMLElement>(`#swiper-wrapper-${id}`);

        products.forEach((product: Product, slideIndex) => {
            swiperWrapper.insertAdjacentHTML('beforeend', createSlide(slideIndex, product));
            const slide = document.querySelector<HTMLElement>(`.swiper-slide-${slideIndex}`);
            slide.onclick = (e) => {
                window.open(product.url, '_blank');
            };
        });

        images.push({ id, element: image });

        getSliderInstance();
    };

    const renderImageWrap = async () => {
        const { image, container } = config;

        document.body.insertAdjacentHTML('beforeend', createWrap());

        container?.classList.add('layer-custom-wrap');

        createSkeleton();

        const result = await loadProducts(image);

        if (result.data.products.length !== 0) {
            createSlider(result.data.products);
        } else if (config.container) {
            config.container.textContent = '';
        }
    };

    return renderImageWrap();
};

const createBodyObserver = () => {
    const observer = new ResizeObserver((entries) => {
        const body = entries.at(0).target;

        images.forEach((image) => {
            const sliderWrap: HTMLDivElement = document.querySelector(`#slider-wrap-${image.id}`);

            if (sliderWrap && body.contains(image.element)) {
                sliderWrap.style.top = `${image.element.y + window.scrollY}px`;
                sliderWrap.style.left = `${image.element.x + window.scrollX}px`;
                sliderWrap.style.width = `${image.element.width}px`;
                sliderWrap.style.height = `${image.element.height}px`;
            }
        });
    });

    observer.observe(document.body);
};

createBodyObserver();

export const initInPicture = async (config: Config): Promise<void> => {
    try {
        if (config.image) {
            const counterInstance = counter();
            const id = counterInstance.getCount();

            await init(config, id);

            return Promise.resolve();
        }

        throw new Error('Изображение не передано');
    } catch (error) {
        if (config.container) {
            config.container.textContent = '';
        }

        console.error('layer-inpicture-sdk', error);

        return Promise.reject(error);
    }
};
