import React from 'react';
import styled from 'styled-components';
import { Header, CarouselGridWrapper, Carousel, CarouselItem } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AnyObject } from '../../types';
import { GalleryCard as CardComponent } from '../../components/GalleryCard/GalleryCard';
import type { GalleryCardProps } from '../../components/GalleryCard/GalleryCard';
import { useRegistry } from '../../hooks/useRegistry';
import { useFocusedState } from '../../hooks/useFocusedState';

import { ShopLandingPageState } from './types';

const StyledCarousel = styled(Carousel)`
    padding: 0.25rem 0;
`;

const StyledCarouselItem = styled(CarouselItem)`
    margin-right: 1rem;
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
    const focusedContainerRef = React.useRef<HTMLDivElement>(null);
    const focused = useFocusedState(focusedContainerRef);

    const [activeIndex, setActiveIndex] = React.useState(0);
    const Component = galleryCard ?? CardComponent;

    const { NavCol } = useRegistry();

    const itemsToRender = React.useMemo(() => {
        return state.items?.map((item, i) => {
            const index = i + 1; // потому что первый элемент в карусели `StoreNav`
            const setFocused = () => setActiveIndex(index);
            const open = () => onItemClick(item);

            return (
                <StyledCarouselItem key={item.id} scrollSnapAlign="start">
                    <Component
                        card={item}
                        focused={focused && activeIndex === index}
                        index={index}
                        onClick={open}
                        onFocus={setFocused}
                    />
                </StyledCarouselItem>
            );
        });
    }, [focused, state.items, Component, activeIndex, onItemClick]);

    return (
        <>
            <Header {...header} />
            <CarouselGridWrapper ref={focusedContainerRef}>
                <StyledCarousel index={activeIndex} axis="x" animatedScrollByIndex style={{ scrollBehavior: 'smooth' }}>
                    <NavCol
                        onFocus={() => setActiveIndex(0)}
                        onCatalogOpen={onCatalogOpen}
                        onStoreInfoClick={onStoreInfoClick}
                        catalogImage={state.catalogImage}
                    />
                    {itemsToRender}
                </StyledCarousel>
            </CarouselGridWrapper>
        </>
    );
};
