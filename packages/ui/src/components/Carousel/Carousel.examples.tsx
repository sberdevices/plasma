import React from 'react';
import styled from 'styled-components';
import { whitePrimary } from '@sberdevices/plasma-tokens';

import { useRemoteListener, useSmartThrottle } from '../../hooks';
import { Card, CardBody, CardMedia } from '../Card';
import { Body1 } from '../Typography/Body';

import { CarouselCol } from './CarouselCol';
import { Axis, ToPrev, ToNext } from './Carousel.types';

const scaleDelta = 0.37;

const StyledCol = styled(CarouselCol)<{ isActive?: boolean }>`
    scroll-snap-align: center;
`;
const StyledColInner = styled.div`
    transition: transform 0.1s ease;
`;
const StyledCard = styled(Card)`
    transition: transform 0.1s ease;
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
    isActive: boolean;
    item: {
        title: string;
        image: string;
    };
}

export const ScalingColCard: React.FC<ScalingColCardProps> = ({ isActive, item }) => (
    <StyledCol size={2} sizeM={1.5} isActive={isActive}>
        <StyledColInner>
            <StyledCard roundness={12} focused={isActive}>
                <CardBody>
                    <CardMedia src={item.image} ratio="1:1" />
                </CardBody>
            </StyledCard>
            <StyledItemTitle>{item.title}</StyledItemTitle>
        </StyledColInner>
    </StyledCol>
);

/**
 * Пример вызыва хука, который слушает вызовы пульта.
 */
export function useRemoteHandlers(axis: Axis, min: number, max: number) {
    const indexState = React.useState(0);
    const smartThrottle = useSmartThrottle<Array<string>>(
        (cmd: '+' | '-') =>
            indexState[1]((prevIndex) => {
                if (cmd === '+') {
                    return prevIndex + 1 <= max ? prevIndex + 1 : min;
                }
                if (cmd === '-') {
                    return prevIndex - 1 >= min ? prevIndex - 1 : max;
                }
                return prevIndex;
            }),
        100,
        700,
    );

    const toPrev = React.useCallback(() => smartThrottle('-'), []);
    const toNext = React.useCallback(() => smartThrottle('+'), []);

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
                default:
                    break;
            }
        }
    });

    return indexState;
}
