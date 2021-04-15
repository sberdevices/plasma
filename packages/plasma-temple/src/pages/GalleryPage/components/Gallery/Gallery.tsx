import React from 'react';
import styled, { css } from 'styled-components';
import { Headline3, Row, Carousel, CarouselGridWrapper, CarouselItem } from '@sberdevices/plasma-ui';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import { GalleryCard, GalleryCardProps } from '../GalleryCard/GalleryCard';
import { Header } from '../../../../components/Header/Header';
import { useRemoteHandlers } from '../../../../hooks/useRemoteHandlers';
import { useVoiceNavigation } from '../../../../hooks/useVoiceNavigation';
import { Gallery as GalleryType } from '../../types';

interface GalleryProps {
    gallery: GalleryType;
    active: boolean;
    multiGallery: boolean;
    withLogo: boolean;
    galleryCard?: React.ComponentType<GalleryCardProps>;
    onCardClick: (id: string) => void;
    changeActiveCard: (index: number) => void;
}

const StyledRow = styled(Row)`
    padding: 1rem 0;
    box-sizing: border-box;
`;

const StyledTitle = styled(Header)<{ active: boolean; withLogo: boolean }>`
    transition: transform 0.35s linear;
    transform: translateX(${({ active, withLogo }) => (active && withLogo ? 3 : 0)}rem);

    ${({ active }) =>
        !active &&
        css`
            padding-bottom: 0;
            padding-top: 0;
        `}
`;

export const Gallery: React.FC<GalleryProps> = React.memo(
    ({ gallery, active, multiGallery, withLogo, galleryCard, onCardClick, changeActiveCard }) => {
        const { activeCardIndex, items: galleryCards, title } = gallery;
        const CardComponent = galleryCard ?? GalleryCard;

        const [cardIndex, changeCardIndex] = useRemoteHandlers({
            initialIndex: activeCardIndex,
            axis: 'x',
            min: 0,
            max: Math.max(galleryCards.length - 1, 0),
            disable: !active,
            repeat: false,
        });

        const handleEnter = React.useCallback(
            (e: KeyboardEvent) => {
                if (active && cardIndex && e.key === 'Enter') {
                    onCardClick(galleryCards[cardIndex].id);
                }
            },
            [active, cardIndex, onCardClick, galleryCards],
        );

        React.useEffect(() => {
            window.addEventListener('keydown', handleEnter);

            return () => {
                window.removeEventListener('keydown', handleEnter);
            };
        }, [handleEnter]);

        React.useEffect(() => {
            if (cardIndex !== activeCardIndex) {
                changeActiveCard(cardIndex);
            }
        }, [cardIndex, activeCardIndex, changeActiveCard]);

        const galleryItems = React.useMemo<React.ReactChild[]>(() => {
            return galleryCards.map(
                (card, index): React.ReactChild => (
                    <CarouselItem key={card.id} scrollSnapAlign="center">
                        <CardComponent
                            card={card}
                            activeCardIndex={active ? cardIndex : -1}
                            index={index}
                            onClick={onCardClick}
                            onFocus={changeCardIndex}
                        />
                    </CarouselItem>
                ),
            );
        }, [active, cardIndex, galleryCards, CardComponent, onCardClick, changeCardIndex]);

        useVoiceNavigation({
            index: cardIndex,
            setIndex: changeCardIndex,
            minIndex: 0,
            maxIndex: galleryCards.length - 1,
            axis: 'x',
            main: !multiGallery,
            disabled: !active,
        });

        return (
            <>
                {multiGallery ? (
                    <StyledTitle active={active} withLogo={withLogo} title={title} back={false} />
                ) : (
                    !isSberPortal() && <Headline3>{title}</Headline3>
                )}
                <CarouselGridWrapper>
                    <Carousel
                        scrollSnapType="mandatory"
                        as={StyledRow}
                        axis="x"
                        index={cardIndex}
                        detectActive={false}
                        animatedScrollByIndex
                    >
                        {galleryItems}
                    </Carousel>
                </CarouselGridWrapper>
            </>
        );
    },
);
