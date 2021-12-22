import { html } from 'htm/preact';

import logo from '../assets/logo.svg';

export const PrimaryTopContent = ({ isShow }: { isShow: boolean }) => html`
    <div class=${`layer-slider-top-content layer-${isShow ? 'opacity-1' : 'opacity-0'}`}>
        <button class="layer-find-products-btn layer-unselectable">Похожие товары
            <img class="layer-logo-img" src="${logo}" alt="logo"/>
            <span class="layer-logo-text">Layer</span>
        </button>
    </div>
`;
