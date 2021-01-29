import styled from 'styled-components';

/**
 * Блок с отрицательными отступами для размещения колонок (``<Col />``) по горизонтали.
 * Блок нельзя вкладывать сам в себя, но можно чередовать далее по дереву с использованием ``Col``.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const Row = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;

    margin-left: calc(var(--plasma-grid-gutter) * -1);
    margin-right: calc(var(--plasma-grid-gutter) * -1);
`;
