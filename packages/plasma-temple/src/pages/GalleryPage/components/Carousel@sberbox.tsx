import React from 'react';
import styled from 'styled-components';

import { useDelayedActivation } from '../../../hooks/useDelayedActivation';

import { CommonCarousel, CarouselProps } from './Carousel';

const StyledCarousel = styled(CommonCarousel)<{ initialized: boolean }>`
    scroll-behavior: ${({ initialized }) => (initialized ? 'smooth' : 'unset')};
`;

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ axis, index, children }, ref) => {
    /* Если индекс карусели изначально не равен 0, то выполняется проскролл до нужного элемента
       в результате происходит не очень красивый эффект автоматического скролла при открытии страницы,
       т.к. включена анимация скролла. Чтобы избежать данного эффекта, изначально анимация отключена и
       включается только после не большой задержки.
       Возможно стоит рассмотреть доработку стандартного компонента карусели, чтобы убрать данный хак.
    */
    const initialized = useDelayedActivation();

    return (
        <StyledCarousel axis={axis} index={index} paddingEnd="50vh" ref={ref} initialized={initialized}>
            {children}
        </StyledCarousel>
    );
});
