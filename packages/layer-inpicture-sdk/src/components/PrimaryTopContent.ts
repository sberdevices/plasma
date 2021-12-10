import { html } from 'htm/preact';

import logo from '../assets/logo.svg';

export const PrimaryTopContent = () => html`
    <div class="layer-slider-top-content">
        <button class="layer-find-products-btn layer-unselectable">Похожие товары
            <img class="layer-logo-img" src="${logo}" alt="logo"/>
            <span class="layer-logo-text">Layer</span>
        </button>
    </div>
`;
