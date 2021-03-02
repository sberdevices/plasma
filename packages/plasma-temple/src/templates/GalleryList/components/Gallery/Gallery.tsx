import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselGridWrapper } from '@sberdevices/ui/components/Carousel';
import { Row } from '@sberdevices/ui/components/Grid';
import { isSberPortal } from '@sberdevices/ui/utils';
import { Headline3 } from '@sberdevices/ui/components/Typography';

import { GalleryCard } from '../GalleryCard/GalleryCard';
import { useRemoteHandlers } from '../../../../hooks/useRemoteHandlers';
import { GalleryViewPayload, GalleryItemViewPayload } from '../../../../types';

const StyledRow = styled(Row)`
    padding: 1rem 0;
    box-sizing: border-box;
`;

interface GalleryProps {
    data: GalleryViewPayload;
    position: number;
    active: boolean;
    onClickGalleryCard: (item: GalleryItemViewPayload) => void
    savePosition: (position: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
    data,
    position,
    active,
    onClickGalleryCard,
    savePosition,
}) => {
    const [currentCardIndex, setCurrentCardIndex] = useRemoteHandlers({
        initialIndex: active ? position : 0,
        axis: 'x',
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

    const galleryItems: React.ReactChild[] = React.useMemo(() => {
        return data.items.map(
            (item, index): React.ReactChild => {
                const imageSrc = Array.isArray(item.image.src) ? item.image.src[0] : item.image.src;

                return (
                    <GalleryCard
                        key={item.id}
                        card={item}
                        position={active ? currentCardIndex : -1}
                        index={index}
                        imageSrc={imageSrc}
                        onClick={onClickGalleryCard}
                        onFocus={setCurrentCardIndex}
                    />
                );
            },
        );
    }, [data.items, onClickGalleryCard, setCurrentCardIndex, active, currentCardIndex]);

    return (
        <>
            {isSberPortal() ? null : <Headline3>{data.title}</Headline3>}
            <CarouselGridWrapper>
                <Carousel as={StyledRow} axis="x" index={currentCardIndex} detectActive={false} animatedScrollByIndex>
                    {galleryItems}
                </Carousel>
            </CarouselGridWrapper>
        </>
    );
};
