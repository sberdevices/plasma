import { html } from 'htm/preact';

import logoBlack from '../assets/logo-black.svg';

export const SecondaryTopContent = () => html`
    <div class="layer-secondary-top-content">
        <div class="layer-secondary-top-content__title">Похожие товары</div>
        <div class="layer-secondary-top-content__devider"></div>
        <div class="layer-secondary-top-content-logo layer-unselectable">
            <img class="layer-secondary-top-content-logo__img" src="${logoBlack}" alt="logo"/>
            <span class="layer-logo-text">Layer</span>
        </div>
    </div>
`;
