import React from 'react';
import styled, { css } from 'styled-components';

import { Headline3, Row } from '@sberdevices/plasma-ui';
import { Carousel, CarouselGridWrapper } from '@sberdevices/plasma-ui';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import { GalleryCard } from '../GalleryCard/GalleryCard';
import { Header } from '../../../../components/Header/Header';
import { CanvasAppContext } from '../../../../canvasAppContext';

import { useRemoteHandlers } from '../../../../hooks/useRemoteHandlers';
import { useVoiceNavigation } from '../../../../hooks/useVoiceNavigation';
import { GalleryViewPayload, GalleryItemViewPayload, Axis, Screen } from '../../../../types';

interface GalleryProps {
    data: GalleryViewPayload;
    position: number;
    active: boolean;
    multiGallery: boolean;
    withLogo: boolean;
    onClickGalleryCard: (item: GalleryItemViewPayload) => void
    savePosition: (position: number) => void;
}

const StyledRow = styled(Row)`
    padding: 1rem 0;
    box-sizing: border-box;
`;

const StyledTitle = styled(Header)<{ active: boolean; withLogo: boolean; }>`
    transition: transform 0.35s linear;
    transform: translateX(${({ active, withLogo }) => (active && withLogo ? 3 : 0)}rem);


    ${({ active }) => !active &&
        css`
            padding-bottom: 0;
            padding-top: 0;
        `
    }
`;

export const Gallery: React.FC<GalleryProps> = ({
    data,
    position,
    active,
    multiGallery,
    withLogo,
    onClickGalleryCard,
    savePosition,
}) => {
    const { configRoute } = React.useContext(CanvasAppContext);
    const  CardComponent = configRoute?.type === Screen.gallery && configRoute?.galleryCard
        ? configRoute.galleryCard
        : GalleryCard;

    const [currentCardIndex, setCurrentCardIndex] = useRemoteHandlers({
        initialIndex: active ? position : 0,
        axis: Axis.X,
        min: 0,
        max: Math.max(data.items.length - 1, 0),
        disable: !active,
        repeat: false,
    });

    const handleEnter = React.useCallback(
        (e: KeyboardEvent) => {
            if (active && currentCardIndex && e.key === 'Enter') {
                onClickGalleryCard(data.items[currentCardIndex]);
            }
        },
        [currentCardIndex, active, onClickGalleryCard],
    );

    React.useEffect(() => {
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [handleEnter]);

    React.useEffect(() => {
        if (active) {
            savePosition(currentCardIndex);
        }
    }, [active, currentCardIndex, savePosition]);

    const activeCardIndex = active ? currentCardIndex : -1;

    const galleryItems: React.ReactChild[] = React.useMemo(() => {
        return data.items.map(
            (item, index): React.ReactChild => (
                <CardComponent
                    key={item.id}
                    card={item}
                    activeCardIndex={activeCardIndex}
                    index={index}
                    onClick={onClickGalleryCard}
                    onFocus={setCurrentCardIndex}
                />
            ),
        );
    }, [data.items, onClickGalleryCard, setCurrentCardIndex, activeCardIndex]);

    useVoiceNavigation({
        index: currentCardIndex,
        setIndex: setCurrentCardIndex,
        minIndex: 0,
        maxIndex: data.items.length - 1,
        axis: Axis.X,
        main: !multiGallery,
        disabled: !active,
    });

    return (
        <>
            {multiGallery
                ? <StyledTitle active={active} withLogo={withLogo} title={data.title} back={false} />
                : isSberPortal() ? null : <Headline3>{data.title}</Headline3>
            }
            <CarouselGridWrapper>
                <Carousel as={StyledRow} axis="x" index={currentCardIndex} detectActive={false} animatedScrollByIndex>
                    {galleryItems}
                </Carousel>
            </CarouselGridWrapper>
        </>
    );
};
