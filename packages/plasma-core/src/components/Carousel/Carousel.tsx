import styled, { css } from 'styled-components';

import type { CarouselProps } from './types';

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

/**
 * Корневой элемент - ограничивающая обертка карусели.
 */
export const Carousel = styled.div<Pick<CarouselProps, 'axis' | 'scrollSnapType'>>`
    position: relative;

    /* stylelint-disable-next-line selector-max-empty-lines, selector-nested-pattern, selector-type-no-unknown */
    ::-webkit-scrollbar {
        display: none;
    }

    ${({ axis }) =>
        axis === 'x'
            ? css`
                  overflow-x: auto;
                  overflow-y: hidden;
              `
            : css`
                  height: 100%;
                  overflow-x: hidden;
                  overflow-y: auto;
              `}

    ${({ scrollSnapType, axis }) =>
        scrollSnapType &&
        scrollSnapType !== 'none' &&
        css`
            scroll-behavior: smooth;
            scroll-snap-type: ${axis} ${scrollSnapType};
        `}

    /* stylelint-disable-next-line */
    ${CarouselGridWrapper} & {
        scroll-padding: 0 var(--plasma-grid-margin);
        padding-left: var(--plasma-grid-margin);
    }
`;

/**
 * Списковый (трековый) элемент карусели для непосредственного вложения айтемов в него.
 */
export const CarouselTrack = styled.div<Pick<CarouselProps, 'axis' | 'paddingStart' | 'paddingEnd'>>`
    ${({ axis, paddingStart, paddingEnd }) =>
        axis === 'x'
            ? css`
                  display: inline-flex;
                  flex-direction: row;

                  ${paddingStart &&
                  css`
                      padding-left: ${paddingStart};
                  `}
                  ${paddingEnd
                      ? css`
                            padding-right: ${paddingEnd};
                        `
                      : css`
                            /* stylelint-disable-next-line selector-nested-pattern */
                            ${CarouselGridWrapper} & {
                                padding-right: var(--plasma-grid-margin);
                            }
                        `}
              `
            : css`
                  display: flex;
                  flex-direction: column;
                  width: 100%;

                  ${paddingStart &&
                  css`
                      padding-top: ${paddingStart};
                  `}
                  ${paddingEnd &&
                  css`
                      padding-bottom: ${paddingEnd};
                  `}
              `}
`;
