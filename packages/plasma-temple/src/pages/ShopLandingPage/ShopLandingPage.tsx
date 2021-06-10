import React from 'react';
import styled from 'styled-components';
import { Header, CarouselGridWrapper, Carousel } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AnyObject } from '../../types';
import { GalleryCard as CardComponent } from '../../components/GalleryCard/GalleryCard';
import type { GalleryCardProps } from '../../components/GalleryCard/GalleryCard';
import { useRegistry } from '../../hooks/useRegistry';
import { useRemoteHandlers, useRemoteListener } from '../../hooks';
import { useFocusedState } from '../../hooks/useFocusedState';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';

import { ShopLandingPageState } from './types';
import { ShopLandingCard } from './components/ShopLandingCard/ShopLandingCard';

const StyledCarousel = styled(Carousel)`
    padding: 0.25rem 0;
    outline: none;
    scroll-snap-type: none;
    scroll-behavior: smooth;
`;

export interface ShopLandingPageProps<T extends AnyObject = AnyObject> {
    header?: HeaderProps;
    onCatalogOpen: () => void;
    onStoreInfoClick: () => void;
    onItemClick: <T1 extends T>(val: T1) => void;
    state: ShopLandingPageState<T>;
    galleryCard?: React.ComponentType<GalleryCardProps<T>>;
}

export const ShopLandingPage: React.FC<ShopLandingPageProps> = ({
    galleryCard,
    state,
    onItemClick,
    header,
    onCatalogOpen,
    onStoreInfoClick,
}) => {
    const { items } = state;
    const focusedContainerRef = React.useRef<HTMLDivElement>(null);
    const focused = useFocusedState(focusedContainerRef);

    const [activeIndex] = useRemoteHandlers({
        initialIndex: 0,
        axis: 'x',
        min: 0,
        max: items.length, // не length - 1, т.к. иначе первый элемент в карусели NavCol не будет учтен
        repeat: false,
    });

    useFocusOnMount(focusedContainerRef);

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

    return (
        <>
            <Header {...header} />
            <CarouselGridWrapper>
                <StyledCarousel ref={focusedContainerRef} index={activeIndex} axis="x" tabIndex={0}>
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
                                index={cardIndex}
                                card={item}
                                component={Component}
                                focused={focused && activeIndex === cardIndex}
                                onClick={onItemClick}
                            />
                        );
                    })}
                </StyledCarousel>
            </CarouselGridWrapper>
        </>
    );
};
