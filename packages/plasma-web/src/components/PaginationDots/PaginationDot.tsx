import styled, { css } from 'styled-components';
import { PaginationDot as DotBase, accent } from '@sberdevices/plasma-core';
import type { PaginationDotProps as BaseProps } from '@sberdevices/plasma-core';

export interface PaginationDotProps extends BaseProps {}

/**
 * Элемент пагинации точками.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const PaginationDot = styled(DotBase)<PaginationDotProps>`
    cursor: pointer;

    &:hover {
        background: ${accent};
    }

    ${({ isActive }) =>
        isActive &&
        css`
            background: ${accent};
        `}
`;
