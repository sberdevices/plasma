import styled from 'styled-components';
import { Carousel, CarouselProps as BaseCarouselProps } from '@sberdevices/plasma-ui';

export type CarouselProps = Omit<BaseCarouselProps, 'detectAvtive' | 'detectThreshold'>;

export const CommonCarousel = styled(Carousel)`
    padding-right: var(--plasma-grid-margin);
`;
