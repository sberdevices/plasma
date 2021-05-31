import styled, { css } from 'styled-components';
import {
    Col as BaseCol,
    ColProps as BaseProps,
    sizes,
    offsets,
    mediaQuery,
    gridSizes,
    gridColumns,
} from '@sberdevices/plasma-core';

export interface ColProps extends BaseProps {
    /**
     * Тип ячейки
     */
    type?: 'rel' | 'calc';
}

/**
 * Блок для размещения контента или строк (``Row``) внутри себя.
 *
 * ``<Col type="rel" />`` — предназначается для верстки с страниц. Поведение по умолчанию.
 * Ширина и отступ данного подтипа колонок имеют относительное значение, которое выражается в процентах.
 *
 * ``<Col type="calc" />`` — предназначается для верстки каруселей.
 * Ширина и отступ данного подтипа колонок рассчитываются на основе ширины контейнера и хранятся в ``CSS Variables``.
 * С примером использования можно ознакомиться в документации по [каруселям](/?path=/docs/controls-carousel--basic).
 */
export const Col = styled(BaseCol)<ColProps>`
    ${({ type = 'rel', theme, size, offset, ...props }) =>
        gridSizes.map((breakpoint) => {
            const bpSize = sizes[breakpoint];
            const bpOffset = offsets[breakpoint];
            const colSize = props[bpSize] || size;
            const colOffset = props[bpOffset] || offset;

            return mediaQuery(
                breakpoint,
                theme.deviceScale,
            )(css`
            ${type === 'rel' && colSize && `width: ${(100 / gridColumns[breakpoint]) * colSize}%;`}
            ${type === 'rel' && colOffset && `margin-left: ${(100 / gridColumns[breakpoint]) * colOffset}%;`}
            ${type === 'calc' && colSize && `width: calc(var(--plasma-grid-column-width) * ${colSize});`}
            ${type === 'calc' && colOffset && `margin-left: calc(var(--plasma-grid-column-width) * ${colOffset});`}
        `);
        })}
`;
