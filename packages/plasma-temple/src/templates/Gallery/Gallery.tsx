import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselGridWrapper } from '@sberdevices/ui/components/Carousel';
import { Row } from '@sberdevices/ui/components/Grid';
import { isSberPortal } from '@sberdevices/ui/utils';
import { Headline3 } from '@sberdevices/ui/components/Typography';

import { useAssistantState } from '../../hooks/useAssistantState';
import { setPositionAction } from '../../store/actions';
import { PageProps, GalleryViewPayload, GalleryItemViewPayload, Screen } from '../../types';
import { useActiveElementClick } from '../../hooks/useSpatNav';
import { Header } from '../../components/Header/Header';
import { GalleryCard } from './components/GalleryCard/GalleryCard';

const StyledRow = styled(Row)`
    padding: 1rem 0;
    box-sizing: border-box;
`;

export const Gallery: React.FC<PageProps<GalleryViewPayload>> = ({
    data,
    stateRef,
    position,
    dispatch,
    header,
    sendData,
}) => {
    const onFocusHandler = React.useCallback(
        (index: number) => {
            dispatch(setPositionAction({ position: index }));
        },
        [dispatch]
    );

    const onClickHandler = React.useCallback(
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

    useActiveElementClick();

    useAssistantState(stateRef, {
        screen: Screen.gallery,
        item_selector: {
            items: data.items.map((item) => ({
                title: item.label,
                number: Number(item.position),
                id: item.id,
                action: {
                    type: 'ITEM/SHOW',
                    payload: { id: item.id },
                },
            })),
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

    const galleryItems: React.ReactChild[] = React.useMemo(() => {
        return data.items.map(
            (item, index): React.ReactChild => {
                const imageSrc = Array.isArray(item.image.src) ? item.image.src[0] : item.image.src;

                return (
                    <GalleryCard
                        key={item.id}
                        card={item}
                        position={position}
                        index={index}
                        imageSrc={imageSrc}
                        onClick={onClickHandler}
                        onFocus={onFocusHandler}
                    />
                );
            },
        );
    }, [data.items, onClickHandler, onFocusHandler, position]);

    return (
        <>
            <Header {...header} />
            {data && (
                <>
                    {isSberPortal() ? null : <Headline3>{data.title}</Headline3>}
                    <CarouselGridWrapper>
                        <Carousel as={StyledRow} axis="x" index={position} detectActive={false} animatedScrollByIndex>
                            {galleryItems}
                        </Carousel>
                    </CarouselGridWrapper>
                </>
            )}
        </>
    );
};

export default Gallery;
