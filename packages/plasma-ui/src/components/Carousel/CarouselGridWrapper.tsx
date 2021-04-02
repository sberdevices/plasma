import styled from 'styled-components';

/**
 * Компонент применяется, если требуется компенсировать отступы контейнера в сетке.
 * При обертывании вокруг ``Carousel``, добавляет карусели и ее прокрутке дополнительные отступы.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const CarouselGridWrapper = styled.div`
    overflow: hidden;
    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
`;
