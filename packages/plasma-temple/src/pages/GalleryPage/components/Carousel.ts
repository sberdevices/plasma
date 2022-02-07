import styled, { StyledComponent } from 'styled-components';
import { Carousel, CarouselProps as BaseCarouselProps } from '@sberdevices/plasma-ui';

import type { GetStyledComponentProps } from '../../../types';

export type CarouselProps = Omit<BaseCarouselProps, 'detectActive' | 'detectThreshold'>;

type StyledComponentProps = GetStyledComponentProps<typeof Carousel>;
type StyledCarousel = StyledComponent<typeof Carousel, any, StyledComponentProps, never>;

export const CommonCarousel: StyledCarousel = styled(Carousel)`
    padding-right: var(--plasma-grid-margin);
`;
