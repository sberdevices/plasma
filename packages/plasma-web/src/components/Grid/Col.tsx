import styled, { css } from 'styled-components';
import { Col as BaseCol, ColProps as BaseProps } from '@sberdevices/plasma-core/components/Grid';
import { sizes, offsets } from '@sberdevices/plasma-core/components/Grid/Col';
import { mediaQuery, gridSizes, gridColumns } from '@sberdevices/plasma-core/utils';

export interface ColProps extends BaseProps {}

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
