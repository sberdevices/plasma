import React from 'react';
import styled from 'styled-components';
import throttle from 'lodash.throttle';

import { useRemoteListener } from '../../hooks';
import type { SnapType } from '../../types';
import { isSberBox } from '../../utils';
import { MusicCard } from '../Card/Card.examples';
import { Row } from '../Grid';
import { Body3 } from '../Typography/Body';

import { Axis } from './Carousel.types';
import { CarouselItemProps } from './CarouselItem';

import { CarouselGridWrapper, Carousel, CarouselCol } from '.';

const scaleDelta = 0.37;

const StyledColInner = styled.div`
    transition: transform 0.1s ease 0s;
`;

const StyledMusicCard = styled(MusicCard)`
    transition: transform 0.1s ease 0s;
`;

/**
 * Функция сброса стилей элементов вне вьюпорта
 */
export const scaleResetCallback = (itemEl: HTMLDivElement) => {
    if (itemEl.children[0]) {
        const inner = itemEl.children[0] as HTMLDivElement;
        const card = inner.children[0] as HTMLDivElement;
        inner.style.transform = '';
        card.style.transform = '';
    }
};

/**
 * Функция увеличения центрального элемента
 */
export const scaleCallback = (itemEl: HTMLDivElement, slot: number) => {
    const absSlot = Math.abs(slot);
    const scaleSlot = 1 - absSlot;
    /**
     * Чем ближе к центру - тем больше
     */
    const cardScale = absSlot <= 1 ? 1 + scaleDelta * scaleSlot : 1;
    const cardOffset = ((absSlot <= 1 ? scaleDelta * scaleSlot : 0) * itemEl.offsetHeight) / -3;
    /**
     * Чем дальше от центра - тем больше прозрачности
     */
    const innerOffset = (scaleDelta * Math.min(absSlot, 1) * Math.sign(slot) * itemEl.offsetWidth) / 2;

    if (itemEl.children[0]) {
        const inner = itemEl.children[0] as HTMLDivElement;
        const card = inner.children[0] as HTMLDivElement;
        inner.style.transform = `translate3d(${innerOffset}px,0,0)`;
        card.style.transform = `scale(${cardScale}) translate3d(0,${cardOffset}px,0)`;
    }
};

export interface ScalingColCardProps {
    scrollSnapAlign?: CarouselItemProps['scrollSnapAlign'];
    isActive: boolean;
    item: {
        title: string;
        imageSrc: string;
    };
}

export const ScalingColCard: React.FC<ScalingColCardProps> = ({ isActive, scrollSnapAlign, item }) => (
    <CarouselCol size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
        <StyledColInner>
            <StyledMusicCard
                title={item.title}
                focused={isActive}
                imageSrc={item.imageSrc}
                imageRatio="1:1"
                textAlign="center"
            />
        </StyledColInner>
    </CarouselCol>
);

/**
 * Пример карусели с вариативными колонками в сетке.
 */
export const CarouselSection: React.FC<{
    heading: string;
    scrollSnap: boolean;
    scrollSnapType: SnapType;
}> = ({ heading, scrollSnap, scrollSnapType, children }) => (
    <section style={{ margin: '1.75rem 0' }}>
        <Body3 style={{ marginBottom: '1rem' }}>{heading}</Body3>
        <CarouselGridWrapper>
            <Carousel as={Row} axis="x" index={0} scrollSnap={scrollSnap} scrollSnapType={scrollSnapType}>
                {children}
            </Carousel>
        </CarouselGridWrapper>
    </section>
);

/**
 * Пример вызыва хука, который слушает вызовы пульта.
 */
export function useRemoteHandlers(axis: Axis, min: number, max: number) {
    const isSberbox = isSberBox();
    const delay = isSberbox ? 300 : 30;
    const longDelay = isSberbox ? 1500 : 150;
    const indexState = React.useState(0);
    const [, setIndex] = indexState;

    const toPrev = React.useCallback(
        throttle(() => setIndex((prevIndex) => (prevIndex - 1 >= min ? prevIndex - 1 : max)), delay),
        [],
    );
    const toNext = React.useCallback(
        throttle(() => setIndex((prevIndex) => (prevIndex + 1 <= max ? prevIndex + 1 : min)), delay),
        [],
    );
    const toFarPrev = React.useCallback(
        throttle(() => setIndex((prevIndex) => (prevIndex - 5 >= min ? prevIndex - 5 : max)), longDelay),
        [],
    );
    const toFarNext = React.useCallback(
        throttle(() => setIndex((prevIndex) => (prevIndex + 5 <= max ? prevIndex + 5 : min)), longDelay),
        [],
    );

    useRemoteListener((key, ev) => {
        ev.preventDefault();
        if (axis === 'x') {
            switch (key) {
                case 'LEFT':
                    toPrev();
                    break;
                case 'RIGHT':
                    toNext();
                    break;
                case 'LONG_LEFT':
                    toFarPrev();
                    break;
                case 'LONG_RIGHT':
                    toFarNext();
                    break;
                default:
                    break;
            }
        } else {
            switch (key) {
                case 'UP':
                    toPrev();
                    break;
                case 'DOWN':
                    toNext();
                    break;
                case 'LONG_UP':
                    toFarPrev();
                    break;
                case 'LONG_DOWN':
                    toFarNext();
                    break;
                default:
                    break;
            }
        }
    });

    return indexState;
}
