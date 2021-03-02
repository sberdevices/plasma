import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselGridWrapper, CarouselItem } from '@sberdevices/ui/components/Carousel';

import { Gallery } from './components/Gallery/Gallery';
import { Header } from '../../components/Header/Header';

import { PageProps, GalleryViewPayload, Screen, GalleryItemViewPayload } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';
import { useRemoteHandlers } from '../../hooks/useRemoteHandlers';
import { setPositionAction, setStepAction } from '../../store/actions';

const StyledCarouselGridWrapper = styled(CarouselGridWrapper)`
    height: 100vh;
`;

export const GalleryList: React.FC<PageProps<GalleryViewPayload[]>> = ({
    data,
    step,
    position,
    stateRef,
    header,
    dispatch,
    sendData,
}) => {
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
            items: data.flatMap(({ items }) => items.map((item) => ({
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
        axis: 'y',
        min: 0,
        max: data.length - 1,
        repeat: false,
    });

    const savePosition = React.useCallback((index: number) => {
        dispatch(setStepAction({ step: galleryIndex}));
        dispatch(setPositionAction({ position: index }));
    }, [galleryIndex, dispatch]);

    return (
        <>
            <Header {...header} />
            <StyledCarouselGridWrapper>
                <Carousel
                    axis="y"
                    index={galleryIndex}
                    scrollSnapType="mandatory"
                    scrollAlign="start"
                    animatedScrollByIndex
                    onIndexChange={setGalleryIndex}
                    detectActive={true}
                    detectThreshold={0.5}
                    paddingEnd="50vh"
                >
                    {data.map((gallery, index) => (
                        <CarouselItem key={gallery.id} data-cy={`gallery-${index}`} scrollSnapAlign="start">
                            <Gallery
                                data={gallery}
                                position={position}
                                active={galleryIndex === index}
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
