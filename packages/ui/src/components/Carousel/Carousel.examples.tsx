import React from 'react';
import styled from 'styled-components';

import type { SnapType } from '../../types';
import { MusicCard } from '../Card/Card.examples';
import { Row } from '../Grid';
import { Body3 } from '../Typography/Body';

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
