import { html } from 'htm/preact';

import arrow from '../assets/arrow.svg';

const buttons = [{ direction: 'next' }, { direction: 'prev' }];

export const SliderButtons = () => html`
    ${buttons.map(({ direction }) => html`
        <div
            class="swiper-button-${direction} layer-swiper-button layer-swiper-button-${direction} layer-unselectable"
            onClick=${(event: MouseEvent) => event.stopPropagation()}
            key=${direction}
        >
            <img src="${arrow}" alt="arrow ${direction}"/>
        </div>
    `)}
`;
