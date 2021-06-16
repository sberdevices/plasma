import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselProps } from '@sberdevices/plasma-ui';

import { useDelayedActivation } from '../../../hooks/useDelayedActivation';

export const StyledCarousel = styled(Carousel)<{ initialized: boolean }>`
    padding-right: var(--plasma-grid-margin);
    scroll-behavior: ${({ initialized }) => (initialized ? 'smooth' : 'unset')};
`;

export const CommonCarousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ children, ...props }, ref) => {
    /* Если индекс карусели изначально не равен 0, то выполняется проскролл до нужного элемента
       в результате происходит не очень красивый эффект автоматического скролла при открытии страницы,
       т.к. включена анимация скролла. Чтобы избежать данного эффекта, изначально анимация отключена и
       включается только после не большой задержки.
       Возможно стоит рассмотреть доработку стандартного компонента карусели, чтобы убрать данный хак.
    */
    const initialized = useDelayedActivation();

    return (
        <StyledCarousel {...props} initialized={initialized} ref={ref}>
            {children}
        </StyledCarousel>
    );
});
