import { Carousel, CarouselProps as PlasmaCarouselProps } from '@sberdevices/plasma-ui';
import styled from 'styled-components';

export type CarouselProps = Pick<PlasmaCarouselProps, 'axis' | 'onIndexChange' | 'index'>;

export const CommonCarousel = styled(Carousel)`
    padding-right: var(--plasma-grid-margin);
    scroll-behavior: smooth;
`;
