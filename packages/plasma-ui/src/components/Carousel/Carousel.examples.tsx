import React from 'react';
import styled from 'styled-components';

import { MusicCard } from '../Card/Card.examples';

import { CarouselCol, CarouselItemProps } from '.';

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

export interface ScalingColCardProps extends Omit<CarouselItemProps, 'size' | 'sizeM'> {
    isActive: boolean;
    item: {
        title: string;
        imageSrc: string;
    };
}

export const ScalingColCard: React.FC<ScalingColCardProps> = ({ isActive, scrollSnapAlign, item, ...rest }) => (
    <CarouselCol size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign} {...rest}>
        <StyledColInner>
            <StyledMusicCard
                title={item.title}
                focused={isActive}
                imageSrc={item.imageSrc}
                imageRatio="1 / 1"
                textAlign="center"
            />
        </StyledColInner>
    </CarouselCol>
);
