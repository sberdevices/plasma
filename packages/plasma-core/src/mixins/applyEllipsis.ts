import { css } from 'styled-components';

export const applyEllipsis = () =>
    css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `;
