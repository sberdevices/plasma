import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../css/styles.css';
import arrow from '../assets/arrow.svg';
import logo from '../assets/logo.svg';
import { Product } from '../types';

Swiper.use([Navigation]);

const BASE_URL = 'https://test-mcrai.sberdevices.ru/v2/frame-mp';
const PLASMA_FONTS_CDN = 'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css';

let closeSlidersIds: number[] = [];

const loadCss = (filename: string) => {
    const cssNode = document.createElement('link');

    cssNode.setAttribute('rel', 'stylesheet');
    cssNode.setAttribute('type', 'text/css');
    cssNode.setAttribute('href', filename);
    document.querySelector('head').appendChild(cssNode);
};

loadCss(PLASMA_FONTS_CDN);

const onButtonClick = (img: HTMLImageElement, index: number) => {
    const swiperContainer = document.querySelector<HTMLElement>(`#swiper-container-${index}`);

    const isClose = closeSlidersIds.includes(index);

    if (isClose) {
        closeSlidersIds = closeSlidersIds.filter((id) => id !== index);
    } else {
        closeSlidersIds.push(index);
    }

    swiperContainer.style.transform = `translateY(${isClose ? 0 : 150}px)`;
};

const createWrap = (index: number, img: HTMLImageElement) => {
    const imgPos = img.getBoundingClientRect();

    const styles = `
        top:${imgPos.top + window.scrollY}px;
        left:${imgPos.left + window.scrollX}px;
        width: ${img.width}px;
        height: ${img.height}px;
    `.replace(/\s/g, '');

    return `<div id="slider-wrap-${index}" class="layer-slider-wrap" style="${styles}"></div>`;
};

const createContent = (index: number) =>
    `<div class="layer-swiper-container mySwiper" id="swiper-container-${index}">
                <div
                    class="slider-top-content"
                    id="slider-top-content-${index}"
                >
                    <button class="layer-find-products-btn unselectable" id="find-products-btn-${index}">Найдено через
                        <img class="layer-logo-btn" src="${logo}" alt="logo"/>
                        <span class="layer-logo">Layer</span>
                    </button>
                </div>
                <div class="swiper-wrapper layer-swiper-wrapper" id="swiper-wrapper-${index}"></div>
                <div class="swiper-button-next layer-swiper-button-next unselectable">
                    <img src="${arrow}"/>
                </div>
                <div class="swiper-button-prev layer-swiper-button-prev unselectable">
                    <img src="${arrow}"/>
                </div>
            </div>
        `;

const createSlide = (product: Product) =>
    `
            <div class="swiper-slide layer-swiper-slide unselectable">
                <img src="${product.pic}"/>
                <div class="layer-swiper-slide-bottom">
                    <div class="layer-swiper-slide-bottom__price">${product.price} ₽</div>
                    <div class="layer-swiper-slide-bottom__category">${product.name}</div>
                    <div class="layer-swiper-slide-bottom__shop-name">${product.retailer.name}</div>
                </div>
            </div>
        `;

const loadProducts = async (img: HTMLImageElement, index: number) => {
    const formData = new FormData();

    const responseImg = await fetch(img.src);
    const blob = await responseImg.blob();

    formData.append('frame', blob, 'foo.jpg');

    const requestOptions = {
        method: 'POST',
        body: formData,
    };

    try {
        const response = await fetch(BASE_URL, requestOptions);
        const result = await response.json();

        if (result.data.products.length !== 0) {
            const sliderWrap = document.querySelector(`#slider-wrap-${index}`);
            sliderWrap.insertAdjacentHTML('afterbegin', createContent(index));

            const hideShowButton: HTMLElement = document.querySelector(`#find-products-btn-${index}`);

            hideShowButton.onclick = () => {
                onButtonClick(img, index);
            };

            const swiperWrapper = document.querySelector<HTMLElement>(`#swiper-wrapper-${index}`);

            result.data.products.forEach((product: Product) =>
                swiperWrapper.insertAdjacentHTML('beforeend', createSlide(product)),
            );

            const sliderTopContent = document.querySelector<HTMLElement>(`#slider-top-content-${index}`);

            swiperWrapper.addEventListener('mouseover', () => {
                sliderTopContent.style.visibility = 'hidden';
            });
            swiperWrapper.addEventListener('mouseout', () => {
                sliderTopContent.style.visibility = 'visible';
            });

            const swiperContainer = document.querySelector<HTMLElement>(`#swiper-container-${index}`);
            swiperContainer.style.width = `${img.width}px`;

            // eslint-disable-next-line no-new
            new Swiper('.mySwiper', {
                slidesPerView: 'auto',
                spaceBetween: 16,
                navigation: {
                    nextEl: '.layer-swiper-button-next',
                    prevEl: '.layer-swiper-button-prev',
                },
            });
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

const renderImageWrap = (img: HTMLImageElement, index: number) => {
    document.body.insertAdjacentHTML('beforeend', createWrap(index, img));

    loadProducts(img, index);
};

window.initInPicture = (config) => {
    const { images = [] } = config;

    for (const [i, img] of images.entries()) {
        renderImageWrap(img, i);
    }
};
