import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { html, render } from 'htm/preact';
import '../css/styles.sass';

import { PLASMA_FONTS_CDN } from '../constants';
import { Config, RequiredKeys } from '../types';
import { Container } from '../components/Container';

Swiper.use([Navigation]);

document.head.insertAdjacentHTML('afterend', `<link href="${PLASMA_FONTS_CDN}" type="text/css" rel="stylesheet">`);

export const initInPicture = async (config: Config): Promise<void> => {
    const { container } = config;
    const requiredParams: Array<RequiredKeys<Config>> = ['image', 'container', 'site'];
    const notPassedRequiredParameters = requiredParams.filter((key) => !config[key]);

    try {
        if (notPassedRequiredParameters.length !== 0) {
            throw new Error(`Не переданы обязательные параметры: ${notPassedRequiredParameters}`);
        }

        container.classList.add('layer-container');

        render(html`<${Container} ...${config} />`, container);
    } catch (error) {
        console.error('layer-inpicture-sdk: ', error);
    }
};
