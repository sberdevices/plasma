import React from 'react';
import styled, { css } from 'styled-components';

import { Headline3, Row } from '@sberdevices/ui';
import { Carousel, CarouselGridWrapper } from '@sberdevices/ui/components/Carousel';
import { isSberPortal, mediaQuery } from '@sberdevices/ui/utils';

import { GalleryCard } from '../GalleryCard/GalleryCard';
import { GalleryViewPayload, GalleryItemViewPayload } from '../../../../types';
import { Header, headerPaddingYM } from '../../../../components/Header/Header';

import { useRemoteHandlers } from '../../../../hooks/useRemoteHandlers';

interface GalleryProps {
    data: GalleryViewPayload;
    position: number;
    active: boolean;
    multiGallery: boolean;
    onClickGalleryCard: (item: GalleryItemViewPayload) => void
    savePosition: (position: number) => void;
}

const StyledRow = styled(Row)`
    padding: 1rem 0;
    box-sizing: border-box;
`;

const StyledTitle = styled(Header)<{ active: boolean }>`
    transition: transform 0.35s linear;
    transform: translateX(${({ active }) => (active ? 3 : 0)}rem);

    ${mediaQuery('M')(css`
        padding-top: ${headerPaddingYM}rem;
    `)}

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
            {multiGallery
                ? <StyledTitle active={active} title={data.title} />
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
