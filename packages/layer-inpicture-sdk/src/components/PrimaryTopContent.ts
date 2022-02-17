import { html } from 'htm/preact';
import { forwardRef } from 'preact/compat';
import cn from 'classnames';

import logo from '../assets/logo.svg';

type Props = {
    isShow: boolean;
    isOpen: boolean;
    onPrimaryHeaderClick: () => void;
};

export const PrimaryTopContent = forwardRef(({ isShow, isOpen, onPrimaryHeaderClick }: Props, ref) => {
    return html`
        <div
            ref=${ref}
            class=${`layer-slider-top-content layer-${isShow ? 'opacity-1' : 'opacity-0'}`}
            onClick=${onPrimaryHeaderClick}
        >
            <button
                class=${cn('layer-find-products-btn layer-unselectable', { 'layer-find-products-btn-open': isOpen })}
            >
                Похожие товары
                <img class="layer-logo-img" src="${logo}" alt="logo" />
                <span class="layer-logo-text">Layer</span>
            </button>
        </div>
    `;
});
