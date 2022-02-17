import styled from 'styled-components';

/**
 * Оборачивающий компонент для пагинации точками.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const PaginationDots = styled.ul.attrs(({ 'aria-hidden': ariaHidden = 'true' }) => ({
    'aria-hidden': ariaHidden,
}))`
    display: flex;
    flex-wrap: wrap;
    align-self: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
`;
