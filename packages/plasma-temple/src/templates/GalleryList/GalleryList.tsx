import React from 'react';
import styled from 'styled-components';
import { Container } from '@sberdevices/ui/components/Grid';
import { Carousel, CarouselGridWrapper, CarouselItem } from '@sberdevices/ui/components/Carousel';

import { Gallery } from './components/Gallery/Gallery';
import { Header } from '../../components/Header/Header';

import { PageProps, MultiGalleryViewPayload, Screen, GalleryItemViewPayload, GalleryViewPayload, Axis } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';
import { useRemoteHandlers } from '../../hooks/useRemoteHandlers';
import { setPositionAction, setStepAction } from '../../store/actions';
import { isSberPortal } from '@sberdevices/ui/utils';
import { useVoiceNavigation } from '../../hooks/useVoiceNavigation';

const StyledCarouselGridWrapper = styled(CarouselGridWrapper)`
    height: 100vh;
`;

const StyledFixedHeader = styled(Container)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`;

export const GalleryList: React.FC<PageProps<MultiGalleryViewPayload>> = ({
    data,
    step,
    position,
    stateRef,
    header,
    dispatch,
    sendData,
}) => {
    const galleries: Array<GalleryViewPayload & { id: string }> = Array.isArray(data) ? data : [{ ...data, id: 'id'}];

    const onClickGalleryCard = React.useCallback(
        (item: GalleryItemViewPayload) => {
            sendData({
                name: 'REQUEST_DATA',
                action: {
                    action_id: 'ITEM/SHOW',
                    parameters: { id: item.id },
                },
            });
        },
        [sendData]
    );

    useAssistantState(stateRef, {
        screen: Screen.gallery,
        item_selector: {
            items: galleries.flatMap(({ items }) => items.map((item) => ({
                title: item.label,
                number: Number(item.position),
                id: item.id,
                action: {
                    type: 'ITEM/SHOW',
                    payload: { id: item.id },
                },
            }))),
        },
    });

    React.useLayoutEffect(() => {
        if (sendData) {
            sendData({
                action: {
                    action_id: 'PAGE_LOADED',
                },
            });
        }
    }, [sendData]);

    const [galleryIndex, setGalleryIndex] = useRemoteHandlers({
        initialIndex: step,
        axis: Axis.Y,
        min: 0,
        max: galleries.length - 1,
        repeat: false,
    });

    const savePosition = React.useCallback((index: number) => {
        dispatch(setStepAction({ step: galleryIndex }));
        dispatch(setPositionAction({ position: index }));
    }, [dispatch, galleryIndex]);

    const detectActiveProps = React.useMemo(() => isSberPortal()
        ? {
            detectActive: true as const,
            detectThreshold: 0.5,
            onIndexChange: setGalleryIndex,
        } : { detectActive: undefined }, [setGalleryIndex]);

    const isMultiGallery = galleries.length > 1;

    useVoiceNavigation({
        index: galleryIndex,
        setIndex: setGalleryIndex,
        minIndex: 0,
        maxIndex: galleries.length - 1,
        stepSize: 1,
        axis: Axis.Y,
        main: true,
        disabled: !isMultiGallery,
    });

    return (
        <>
            {isMultiGallery ? (
                <StyledFixedHeader>
                    <Header {...header} title="" />
                </StyledFixedHeader>
            ): (
                <Header { ...header } />
            )}
            <StyledCarouselGridWrapper>
                <Carousel
                    axis="y"
                    index={galleryIndex}
                    scrollSnapType="mandatory"
                    scrollAlign="start"
                    paddingEnd="50vh"
                    { ...detectActiveProps }
                >
                    {galleries.map((gallery, index) => (
                        <CarouselItem key={gallery.id} data-cy={`gallery-${index}`} scrollSnapAlign="start">
                            <Gallery
                                data={gallery}
                                position={position}
                                active={galleryIndex === index}
                                multiGallery={isMultiGallery}
                                withLogo={Boolean(header.logo)}
                                onClickGalleryCard={onClickGalleryCard}
                                savePosition={savePosition}
                            />
                        </CarouselItem>
                    ))}
                </Carousel>
            </StyledCarouselGridWrapper>
        </>
    );
};

export default GalleryList;
