import styled, { css } from 'styled-components';

import { primary, surfaceLiquid03 } from '../../tokens';

export interface PaginationDotProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /**
     * Элемент активен
     */
    isActive: boolean;
}

/**
 * Элемент пагинации точками.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const PaginationDot = styled.li<PaginationDotProps>`
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 1rem;
    background: ${surfaceLiquid03};
    transition: ${({ theme }) =>
        theme.lowPerformance ? 'unset' : 'width 0.1s ease-in-out, background 0.3s ease-in-out'};
    font-size: 0.5rem;

    & + & {
        margin-left: 0.375rem;
    }

    &:focus {
        outline: 0 none;
    }

    ${({ isActive }) =>
        isActive &&
        css`
            width: 1.75rem;
            background: ${primary};
        `}
`;
