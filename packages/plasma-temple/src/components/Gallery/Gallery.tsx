import React from 'react';
import styled from 'styled-components';
import { CarouselGridWrapper, Carousel, CarouselItem } from '@sberdevices/plasma-ui';
import { isSberBox, isSberPortal } from '@sberdevices/plasma-ui/utils';

import { AnyObject } from '../../types';
import { GalleryCard as DefaultGalleryCard, GalleryCardProps } from '../GalleryCard/GalleryCard';
import { useDelayedActivation } from '../../hooks/useDelayedActivation';

import { GalleryIndexContext, withNavigation } from './hocs/withNavigation';
import { GalleryProps, GalleryPropsWithComponent, GalleryWithNavigationProps } from './types';

const StyledCarouselWrapper = styled(CarouselGridWrapper)`
    margin-top: -8px;
`;

const StyledCarousel = styled(Carousel)<{ initialized: boolean }>`
    box-sizing: border-box;
    padding-top: 8px;
    padding-bottom: 8px;
    outline: none;
    scroll-snap-type: none;
    scroll-behavior: ${({ initialized }) => (initialized && isSberBox() ? 'smooth' : 'unset')};
`;

const StyledCarouselItem = styled(CarouselItem)`
    padding-right: 32px;

    &:last-child {
        padding-right: 0;
    }
`;

/*  TODO: Нужен рефакторинг сейчас у нас слишком сложный интерфейс.
    Компонент GalleryCard используется по сути как дефолтный компонент его логика не учитывается,
    в итоге в кастомных компонентах вся логика повторяется. По хорошему кастомный компонент
    должен переопределять только верстку
*/
const GalleryCard = <T extends AnyObject>({
    card,
    index,
    focused,
    onItemClick,
    onFocus,
    Component,
}: Omit<GalleryCardProps<T>, 'onClick'> & Pick<GalleryPropsWithComponent<T>, 'Component' | 'onItemClick'>) => {
    const GalleryCardComponent = Component ?? DefaultGalleryCard;

    const handleClick = React.useCallback(() => onItemClick(card, index), [card, index, onItemClick]);

    return <GalleryCardComponent card={card} index={index} onClick={handleClick} onFocus={onFocus} focused={focused} />;
};

export function Gallery<T extends AnyObject>({
    items = [],
    onItemClick = () => {},
    onItemFocus = () => {},
    Component,
    children,
    className,
}: GalleryProps<T>): React.ReactElement {
    const currentCardIndex = React.useContext(GalleryIndexContext);
    const initialized = useDelayedActivation();

    const canBeFocused = currentCardIndex > -1;

    return (
        <StyledCarouselWrapper data-cy="gallery">
            <StyledCarousel
                className={className}
                index={currentCardIndex}
                axis="x"
                tabIndex={-1}
                scrollSnapType="mandatory"
                scrollAlign="start"
                initialized={initialized}
            >
                {children ??
                    items.map((card, index) => (
                        <StyledCarouselItem key={index} scrollSnapAlign={isSberPortal() ? 'start' : undefined}>
                            <GalleryCard<T>
                                Component={Component}
                                index={index}
                                onItemClick={onItemClick}
                                onFocus={onItemFocus}
                                card={card}
                                focused={canBeFocused && currentCardIndex === index}
                            />
                        </StyledCarouselItem>
                    ))}
            </StyledCarousel>
        </StyledCarouselWrapper>
    );
}

export const GalleryWithNavigation = React.memo(withNavigation(Gallery)) as <T extends AnyObject = AnyObject>(
    props: GalleryWithNavigationProps<T>,
) => React.ReactElement;
