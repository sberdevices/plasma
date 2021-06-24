import { css } from 'styled-components';

export const applyNoSelect = () =>
    css`
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    `;
