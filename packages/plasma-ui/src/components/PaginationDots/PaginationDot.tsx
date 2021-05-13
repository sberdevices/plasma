import styled from 'styled-components';
import { PaginationDot as DotBase, PaginationDotProps as BaseProps } from '@sberdevices/plasma-core';

export interface PaginationDotProps extends BaseProps {}

/**
 * Элемент пагинации точками.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const PaginationDot = styled(DotBase)<PaginationDotProps>``;
