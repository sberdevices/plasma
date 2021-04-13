import React from 'react';
import styled from 'styled-components';

import { Carousel, CarouselGridWrapper, CarouselItem, Container } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import { Gallery } from './components/Gallery/Gallery';
import { GalleryCardProps } from './components/GalleryCard/GalleryCard';
import { Header } from '../../components/Header/Header';
import { useRemoteHandlers } from '../../hooks/useRemoteHandlers';

import { GalleryPageState } from './types';

interface GalleryPageProps {
    state: GalleryPageState;
    changeState: (state: GalleryPageState) => void;
    onCardClick: (id: string) => void;
    header?: HeaderProps;
    galleryCard?: React.ComponentType<GalleryCardProps>;
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

export const GalleryPage: React.FC<GalleryPageProps> = ({ state, header, changeState, onCardClick, galleryCard }) => {
    const { gallery, activeGalleryIndex } = state;
    const galleries = React.useMemo(() => (Array.isArray(gallery) ? gallery : [{ id: 'id', ...gallery }]), [gallery]);

    const [galleryIndex, changeGallery] = useRemoteHandlers({
        initialIndex: activeGalleryIndex,
        axis: 'y',
        min: 0,
        max: galleries.length - 1,
        repeat: false,
    });

    React.useEffect(() => {
        changeState({ ...state, activeGalleryIndex: galleryIndex });
    }, [galleryIndex]);

    const changeActiveCard = React.useCallback(
        (index: number) => {
            if (!Array.isArray(gallery)) {
                changeState({ ...state, gallery: { ...gallery, activeCardIndex: index } });
            } else {
                changeState({
                    ...state,
                    gallery: [
                        ...gallery.slice(0, galleryIndex),
                        { ...gallery[galleryIndex], activeCardIndex: index },
                        ...gallery.slice(galleryIndex + 1),
                    ],
                });
            }
        },
        [gallery, galleryIndex],
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
