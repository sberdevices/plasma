import React from 'react';
import styled from 'styled-components';
import { whitePrimary } from '@sberdevices/plasma-tokens';

import { Card, CardBody, CardMedia } from '../Card';
import { Body1 } from '../Typography/Body';

import { CarouselCol } from './CarouselCol';

const scaleDelta = 0.37;
const opacityMin = 0.25;

const StyledColInner = styled.div`
    transition: transform 0.1s ease;
    opacity: ${opacityMin};
`;

const StyledCard = styled(Card)`
    transition: transform 0.1s ease, opacity 0.1s ease;
`;

const StyledItemTitle = styled(Body1)`
    margin-top: 0.75rem;
    color: ${whitePrimary};
    text-align: center;
`;

/**
 * Функция сброса стилей элементов вне вьюпорта
 */
export const scaleResetCallback = (itemEl: HTMLDivElement) => {
    if (itemEl.children[0]) {
        const inner = itemEl.children[0] as HTMLDivElement;
        const card = inner.children[0] as HTMLDivElement;
        inner.style.transform = '';
        inner.style.opacity = '';
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
    const innerOpacity = 1 - Math.min(absSlot, 2) * opacityMin;
    const innerOffset = (scaleDelta * Math.min(absSlot, 1) * Math.sign(slot) * itemEl.offsetWidth) / 2;

    if (itemEl.children[0]) {
        const inner = itemEl.children[0] as HTMLDivElement;
        const card = inner.children[0] as HTMLDivElement;
        inner.style.transform = `translate3d(${innerOffset}px,0,0)`;
        inner.style.opacity = `${innerOpacity}`;
        card.style.transform = `scale(${cardScale}) translate3d(0,${cardOffset}px,0)`;
    }
};

export interface ScalingColCardProps {
    isActive: boolean;
    item: {
        title: string;
        image: string;
    };
}

export const ScalingColCard: React.FC<ScalingColCardProps> = ({ isActive, item }) => (
    <CarouselCol size={2} sizeM={1.5} scrollSnapAlign="center">
        <StyledColInner>
            <StyledCard roundness={12} focused={isActive}>
                <CardBody>
                    <CardMedia src={item.image} ratio="1:1" />
                </CardBody>
            </StyledCard>
            <StyledItemTitle>{item.title}</StyledItemTitle>
        </StyledColInner>
    </CarouselCol>
);
