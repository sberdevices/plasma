import styled, { css } from 'styled-components';

import type { VirtualCarouselProps } from './types';

/**
 * Компонент применяется, если требуется компенсировать отступы контейнера в сетке.
 * При обертывании вокруг ``Carousel``, добавляет карусели и ее прокрутке дополнительные отступы.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const VirtualCarouselGridWrapper = styled.div`
    overflow: hidden;
    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
`;

/**
 * Корневой элемент - ограничивающая обертка карусели.
 */
export const VirtualCarousel = styled.div<Pick<VirtualCarouselProps, 'carouselHeight' | 'axis' | 'scrollSnapType'>>`
    position: relative;
    ${({ carouselHeight, axis }) => css`
        ${axis === 'y' ? 'height' : 'width'}: ${carouselHeight}px;
    `}
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
                  overflow-x: hidden;
                  overflow-y: auto;
              `}

    ${({ scrollSnapType, axis }) =>
        scrollSnapType &&
        scrollSnapType !== 'none' &&
        css`
            //scroll-behavior: smooth;
            //scroll-snap-type: ${axis} ${scrollSnapType};
        `}

    /* stylelint-disable-next-line */
    ${VirtualCarouselGridWrapper} & {
        scroll-padding: 0 var(--plasma-grid-margin);
        padding-left: var(--plasma-grid-margin);
    }
`;

/**
 * Списковый (трековый) элемент карусели для непосредственного вложения айтемов в него.
 */
export const VirtualCarouselTrack = styled.div<
    Pick<VirtualCarouselProps, 'carouselHeight' | 'axis' | 'paddingStart' | 'paddingEnd'>
>`
    position: relative;
    ${({ carouselHeight, axis }) => css`
        ${axis === 'x' ? 'width' : 'height'}: ${carouselHeight}px;
    `}
    ${({ axis, paddingStart, paddingEnd }) =>
        axis === 'x'
            ? css`
                  //display: inline-flex;
                  //flex-direction: row;

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
                            ${VirtualCarouselGridWrapper} & {
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
