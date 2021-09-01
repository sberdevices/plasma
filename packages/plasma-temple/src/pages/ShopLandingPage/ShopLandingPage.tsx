import React from 'react';
import { Header, CarouselGridWrapper } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AnyObject } from '../../types';
import { GalleryCard as CardComponent } from '../../components/GalleryCard/GalleryCard';
import { GalleryCardProps } from '../../components/GalleryCard/types';
import { useRegistry } from '../../hooks/useRegistry';
import { useRemoteHandlers, useRemoteListener } from '../../hooks';
import { useFocusedState } from '../../hooks/useFocusedState';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import { useGetMutableValue } from '../../hooks/useGetMutableValue';
import { isSberBoxLike } from '../..';

import { ShopLandingPageState } from './types';
import { ShopLandingCard } from './components/ShopLandingCard/ShopLandingCard';
import { ShopLandingCarousel } from './components/Carousel/ShopLandingCarousel';

export interface ShopLandingPageProps<T extends AnyObject = AnyObject> {
    state: ShopLandingPageState<T>;
    header?: HeaderProps;
    galleryCard?: React.ComponentType<GalleryCardProps<T>>;
    onCatalogOpen: () => void;
    onStoreInfoClick: () => void;
    onItemClick: (val: T) => void;
    changeState: (state: ShopLandingPageState<T>) => void;
}

export const ShopLandingPage = <T extends AnyObject = AnyObject>({
    galleryCard,
    state,
    onItemClick,
    header,
    onCatalogOpen,
    onStoreInfoClick,
    changeState,
}: ShopLandingPageProps<T>): React.ReactElement => {
    const { items, activeCardIndex = 0 } = state;
    const getState = useGetMutableValue(state);

    const focusedContainerRef = React.useRef<HTMLDivElement>(null);
    const focused = useFocusedState(focusedContainerRef);

    const [activeIndex, setActiveIndex] = useRemoteHandlers({
        initialIndex: activeCardIndex,
        axis: 'x',
        min: 0,
        max: items.length, // не length - 1, т.к. иначе первый элемент в карусели NavCol не будет учтен
        repeat: false,
    });

    useFocusOnMount(focusedContainerRef, { prevent: !isSberBoxLike() });

    const Component = galleryCard ?? CardComponent;

    const { NavCol } = useRegistry();

    useRemoteListener(
        (key) => {
            if (key === 'OK' && focused && activeIndex) {
                onItemClick(items[activeIndex - 1]);
            }
        },
        { disable: !focused },
    );

    React.useEffect(() => {
        const currentState = getState();
        if (currentState.activeCardIndex !== activeIndex) {
            changeState({ ...currentState, activeCardIndex: activeIndex });
        }
    }, [activeIndex, changeState, getState]);

    const handleItemClick = React.useCallback(
        (card, index: number) => {
            setActiveIndex(index);
            onItemClick(card);
        },
        [onItemClick, setActiveIndex],
    );

    return (
        <>
            <Header {...header} />
            <CarouselGridWrapper>
                <ShopLandingCarousel ref={focusedContainerRef} index={activeIndex}>
                    <NavCol
                        onCatalogOpen={onCatalogOpen}
                        onStoreInfoClick={onStoreInfoClick}
                        catalogImage={state.catalogImage}
                        focused={focused && activeIndex === 0}
                    />
                    {items.map((item, index) => {
                        const cardIndex = index + 1; // первый элемент в карусели NavCol
                        return (
                            <ShopLandingCard
                                key={item.id}
                                index={cardIndex}
                                card={item}
                                component={Component}
                                focused={focused && activeIndex === cardIndex}
                                onClick={handleItemClick}
                            />
                        );
                    })}
                </ShopLandingCarousel>
            </CarouselGridWrapper>
        </>
    );
};
