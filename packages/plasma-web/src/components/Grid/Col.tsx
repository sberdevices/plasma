import styled, { css } from 'styled-components';
import { Col as BaseCol, sizes as baseSizes, offsets as baseOffsets } from '@sberdevices/plasma-core';
import type {
    ColProps as BaseProps,
    ColSizeProps as BaseSizeProps,
    ColOffsetProps as BaseOffsetProps,
    ColCount as BaseColCount,
} from '@sberdevices/plasma-core';

import { gridColumns, gridSizes, mediaQuery, Breakpoint } from '../../utils';

type ColCountExtInt = 13 | 14 | 15 | 16;
type ColCountExtFlt = 12.5 | 13.5 | 14.5 | 15.5;
export type ColCount = BaseColCount | ColCountExtInt | ColCountExtFlt;

export interface ColSizeProps extends BaseSizeProps {
    /**
     * Размер ячейки при разрешении XXL
     */
    sizeXXL?: ColCount;
}

export interface ColOffsetProps extends BaseOffsetProps {
    /**
     * Отступ ячейки при разрешении XXL
     */
    offsetXXL?: ColCount;
}

export const sizes: Record<Breakpoint, keyof ColSizeProps> = {
    XXL: 'sizeXXL',
    ...baseSizes,
};

export const offsets: Record<Breakpoint, keyof ColOffsetProps> = {
    XXL: 'offsetXXL',
    ...baseOffsets,
};

export interface ColProps extends ColSizeProps, ColOffsetProps, BaseProps {}

const deviceScale = 1;

/**
 * Блок для размещения контента или строк (``Row``) внутри себя.
 */
export const Col = styled(BaseCol)<ColProps>`
    ${({ size, offset, ...props }) =>
        gridSizes.map((breakpoint) => {
            const bpSize = sizes[breakpoint];
            const bpOffset = offsets[breakpoint];
            const colSize = props[bpSize] || size;
            const colOffset = props[bpOffset] || offset;

            return mediaQuery(
                breakpoint,
                deviceScale,
            )(css`
                ${colSize && `width: ${(100 / gridColumns[breakpoint]) * colSize}%;`}
                ${colOffset && `margin-left: ${(100 / gridColumns[breakpoint]) * colOffset}%;`}
            `);
        })}
`;
