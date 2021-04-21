import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselGridWrapper, CarouselItem, Container } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import { useRemoteHandlers } from '../../hooks/useRemoteHandlers';
import { useGetState } from '../../hooks/useGetState';
import { Header } from '../../components/Header/Header';
import { AnyObject } from '../../types';

import { Gallery } from './components/Gallery/Gallery';
import { GalleryCardProps } from './components/GalleryCard/GalleryCard';
import { GalleryPageState } from './types';

interface GalleryPageProps<T extends AnyObject = AnyObject> {
    state: GalleryPageState<T>;
    changeState: (state: GalleryPageState<T>) => void;
    onCardClick: (id: string) => void;
    header?: HeaderProps;
    galleryCard?: React.ComponentType<GalleryCardProps<T>>;
}

const StyledCarouselGridWrapper = styled(CarouselGridWrapper)`
    height: 100vh;
`;

const StyledFixedHeader = styled(Container)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`;

export const GalleryPage = <T extends AnyObject = AnyObject>({
    state,
    header,
    changeState,
    onCardClick,
    galleryCard,
}: GalleryPageProps<T>): React.ReactElement => {
    const { gallery, activeGalleryIndex } = state;
    const galleries = React.useMemo(() => (Array.isArray(gallery) ? gallery : [{ id: 'id', ...gallery }]), [gallery]);

    const [galleryIndex, changeGallery] = useRemoteHandlers({
        initialIndex: activeGalleryIndex,
        axis: 'y',
        min: 0,
        max: galleries.length - 1,
        repeat: false,
    });

    const getState = useGetState(state);

    React.useEffect(() => {
        const currentState = getState();
        if (currentState.activeGalleryIndex !== galleryIndex) {
            changeState({ ...currentState, activeGalleryIndex: galleryIndex });
        }
    }, [changeState, getState, galleryIndex]);

    const changeActiveCard = React.useCallback(
        (index: number) => {
            const currentState = getState();
            if (!Array.isArray(currentState.gallery)) {
                changeState({ ...currentState, gallery: { ...currentState.gallery, activeCardIndex: index } });
            } else {
                changeState({
                    ...currentState,
                    gallery: [
                        ...currentState.gallery.slice(0, galleryIndex),
                        { ...currentState.gallery[galleryIndex], activeCardIndex: index },
                        ...currentState.gallery.slice(galleryIndex + 1),
                    ],
                });
            }
        },
        [changeState, galleryIndex, getState],
    );

    const detectActiveProps = React.useMemo(
        () =>
            isSberPortal()
                ? {
                      detectActive: true as const,
                      detectThreshold: 0.5,
                      onIndexChange: changeGallery,
                  }
                : { detectActive: undefined },
        [changeGallery],
    );

    const isMultiGallery = galleries.length > 1;

    return (
        <>
            {isMultiGallery ? (
                <StyledFixedHeader>
                    <Header {...header} title="" />
                </StyledFixedHeader>
            ) : (
                <Header {...header} />
            )}
            <StyledCarouselGridWrapper>
                <Carousel
                    axis="y"
                    index={galleryIndex}
                    scrollSnapType="mandatory"
                    scrollAlign="start"
                    paddingEnd="50vh"
                    {...detectActiveProps}
                >
                    {galleries.map((item, index) => (
                        <CarouselItem key={item.id} data-cy={`gallery-${index}`} scrollSnapAlign="start">
                            <Gallery
                                gallery={item}
                                active={galleryIndex === index}
                                multiGallery={isMultiGallery}
                                withLogo={Boolean(header?.logo)}
                                onCardClick={onCardClick}
                                changeActiveCard={changeActiveCard}
                                galleryCard={galleryCard}
                            />
                        </CarouselItem>
                    ))}
                </Carousel>
            </StyledCarouselGridWrapper>
        </>
    );
};

export default GalleryPage;
