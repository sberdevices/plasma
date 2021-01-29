import React from 'react';
import styled, { css } from 'styled-components';

import { mediaQuery, gridSizes, gridColumns, Breakpoint } from '../../utils';

type ColCount =
    | 1
    | 1.5
    | 2
    | 2.5
    | 3
    | 3.5
    | 4
    | 4.5
    | 5
    | 5.5
    | 6
    | 6.5
    | 7
    | 7.5
    | 8
    | 8.5
    | 9
    | 9.5
    | 10
    | 10.5
    | 11
    | 11.5
    | 12;

interface MediaProps {
    sizeS?: ColCount;
    sizeM?: ColCount;
    sizeL?: ColCount;
    sizeXL?: ColCount;
}

interface OffsetProps {
    offsetS?: ColCount;
    offsetM?: ColCount;
    offsetL?: ColCount;
    offsetXL?: ColCount;
}

const sizes: Record<Breakpoint, keyof MediaProps> = {
    /**
     * Размер ячейки при разрешении S
     */
    S: 'sizeS',
    /**
     * Размер ячейки при разрешении M
     */
    M: 'sizeM',
    /**
     * Размер ячейки при разрешении L
     */
    L: 'sizeL',
    /**
     * Размер ячейки при разрешении XL
     */
    XL: 'sizeXL',
};

const offsets: Record<Breakpoint, keyof OffsetProps> = {
    S: 'offsetS',
    M: 'offsetM',
    L: 'offsetL',
    XL: 'offsetXL',
};

const StyledColBase = styled.div`
    box-sizing: border-box;

    padding-left: var(--plasma-grid-gutter);
    padding-right: var(--plasma-grid-gutter);
`;

interface StyledColProps extends MediaProps, OffsetProps {
    $type: 'rel' | 'calc';
}

const StyledCol = styled(StyledColBase)<StyledColProps>`
    ${({ $type, theme, ...props }) =>
        gridSizes.map((breakpoint) => {
            const size = props[sizes[breakpoint]];
            const offset = props[offsets[breakpoint]];
            return mediaQuery(
                breakpoint,
                theme.deviceScale,
            )(css`
                ${$type === 'rel' && size && `width: ${(100 / gridColumns[breakpoint]) * size}%;`}
                ${$type === 'rel' && offset && `margin-left: ${(100 / gridColumns[breakpoint]) * offset}%;`}
                ${$type === 'calc' && size && `width: calc(var(--plasma-grid-column-width) * ${size});`}
                ${$type === 'calc' && offset && `margin-left: calc(var(--plasma-grid-column-width) * ${offset});`}
            `);
        })}
`;

export interface ColProps extends MediaProps, OffsetProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Тип ячейки
     */
    type?: StyledColProps['$type'];
    /**
     * Размер ячейки, зависящий от максимального количества столбцов
     */
    size?: ColCount;
    /**
     * Отступ ячейки, сдвинет ее на n ячеек вправо
     */
    offset?: ColCount;
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
export const Col = React.forwardRef<HTMLDivElement, ColProps>(
    ({ type = 'rel', size, offset, children, ...props }, ref) => {
        if (size) {
            Object.values(sizes).forEach((sizeProp) => {
                if (!props[sizeProp]) {
                    props[sizeProp] = size;
                }
            });
        }
        if (offset) {
            Object.values(offsets).forEach((offsetProp) => {
                if (!props[offsetProp]) {
                    props[offsetProp] = offset;
                }
            });
        }
        return (
            <StyledCol ref={ref} $type={type} {...props}>
                {children}
            </StyledCol>
        );
    },
);
