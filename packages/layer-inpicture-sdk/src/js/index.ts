import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../css/styles.sass';
import arrow from '../assets/arrow.svg';
import logo from '../assets/logo.svg';
import logoBlack from '../assets/logo-black.svg';
import { Config, Product } from '../types';

Swiper.use([Navigation]);

const BASE_URL = 'https://mcrai.sberdevices.ru/v2/frame-mp';
const PLASMA_FONTS_CDN = 'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css';

let closeSlidersIds: number[] = [];

const init = (config: Config, id: number) => {
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

        const isClose = closeSlidersIds.includes(id);

        if (isClose) {
            closeSlidersIds = closeSlidersIds.filter((closeSliderIds) => closeSliderIds !== id);
        } else {
            closeSlidersIds.push(id);
        }

        swiperContainer.style.transform = `translateY(${isClose ? 0 : adaptiveValue(166, 137)})`;
    };

    const createWrap = (img: HTMLImageElement) => {
        const imgPos = img.getBoundingClientRect();

        const styles = `
        top:${imgPos.top + window.scrollY}px;
        left:${imgPos.left + window.scrollX}px;
        width: ${img.width}px;
        height: ${img.height}px;
    `.replace(/\s/g, '');

        return `<div id="slider-wrap-${id}" class="layer-slider-wrap" style="${styles}"></div>`;
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

    const createSlide = (product: Product, slideIndex: number) => `
        <div class="swiper-slide swiper-slide-${slideIndex} layer-swiper-slide unselectable" style="width: ${adaptiveValue(94, 74)}; height: ${adaptiveValue(138, 108)}">
            <img src="${product.pic}" alt="product"/>
            <div class="layer-swiper-slide-bottom">
                <div class="layer-swiper-slide-bottom__price">${product.price} ₽</div>
                <div class="layer-swiper-slide-bottom__category">${product.name}</div>
                <div class="layer-swiper-slide-bottom__shop-name">${product.retailer.name}</div>
            </div>
        </div>
    `;

    const createSlider = (products: Product[]) => {
        const { image, container } = config;

        if (container) {
            container?.classList.add('layer-custom-wrap');
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
            swiperWrapper.insertAdjacentHTML('beforeend', createSlide(product, slideIndex));
            const slide = document.querySelector<HTMLElement>(`.swiper-slide-${slideIndex}`);
            slide.onclick = (e) => {
                window.open(product.url, '_blank');
            };
        });

        const swiperContainer = document.querySelector<HTMLElement>(`#swiper-container-${id}`);
        swiperContainer.style.width = `${image.width}px`;

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

    const renderImageWrap = async () => {
        const { image } = config;

        document.body.insertAdjacentHTML('beforeend', createWrap(image));

        const result = await loadProducts(image);

        if (result.data.products.length !== 0) {
            createSlider(result.data.products);
        }
    };

    return renderImageWrap();
};

let id = 0;
export const initInPicture = async (config: Config): Promise<void> => {
    try {
        await init(config, id++);
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
};
