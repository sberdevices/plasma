import React from 'react';
import styled, { css } from 'styled-components';
import { secondary, tertiary, display2, headline1, scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { useCarouselItem } from '../Carousel';

const sizes = {
    l: {
        ...display2,
        height: `${60 / scalingPixelBasis}rem`,
    },
    s: {
        letterSpacing: headline1.letterSpacing,
        fontSize: headline1.fontSize,
        fontWeight: 600,
        lineHeight: `${36 / scalingPixelBasis}rem`,
        height: `${36 / scalingPixelBasis}rem`,
    },
};

const round = (n: number) => Math.round(n * 100) / 100;

export type Item = {
    value: string | number | Date;
    label: string | number;
};

export interface SizeProps {
    /**
     * Размер компонента
     */
    size?: keyof typeof sizes;
}

const fullOpacity = 1;
const noneOpacity = 0;

/**
 * Малый размер => большой размер
 * Серый текст => белый текст
 */
const scaleCallback = (x0Scale: number, x1Scale: number, x2Scale: number, offsetDelta: number) => (
    itemEl: HTMLElement,
    slot: number,
) => {
    const absSlot = Math.abs(slot);
    const ceilSlot = Math.ceil(absSlot) || 1;
    const normSlot = Math.min(absSlot, ceilSlot); // Нормализованное значение
    const progSlot = ceilSlot - normSlot; // Прогресс (от X до 0)
    const shift = (offsetDelta * itemEl.offsetHeight) / 2;
    let opacity;
    let offset;
    let scale;

    switch (true) {
        case absSlot <= 1:
            scale = round(progSlot * (x0Scale - x1Scale) + x1Scale);
            offset = round(slot * shift);
            opacity = round(progSlot * (fullOpacity - noneOpacity) + noneOpacity);
            break;
        case absSlot <= 2:
            scale = round(progSlot * (x1Scale - x2Scale) + x2Scale);
            offset = round(progSlot * shift * Math.sign(slot));
            opacity = noneOpacity;
            break;
        default:
            scale = round(progSlot * x2Scale);
            offset = round(((normSlot - 2) / (ceilSlot - 2)) * Math.sign(slot) * -1 * itemEl.offsetHeight);
            opacity = noneOpacity;
    }

    if (itemEl.children[0] instanceof HTMLElement) {
        const transformable = itemEl.children[0];
        transformable.style.transform = `scale(${scale}) translate3d(0,${offset}px,0)`;

        /**
         * Серый текст
         */
        if (transformable.children[0] instanceof HTMLElement) {
            transformable.children[0].style.opacity = `${1 - opacity}`;
        }
        /**
         * Белый текст
         */
        if (transformable.children[1] instanceof HTMLElement) {
            transformable.children[1].style.opacity = `${opacity}`;
        }
    }
};

export const scaleCallbackL = scaleCallback(1, 0.8, 0.8, 0.5);
export const scaleCallbackS = scaleCallback(1, 0.75, 0.5, 0.5);

/**
 * Сброс стилей
 */
export const scaleResetCallback = (itemEl: HTMLElement) => {
    if (itemEl.children[0] instanceof HTMLElement) {
        const transformable = itemEl.children[0];
        transformable.style.transform = '';

        if (transformable.children[0] instanceof HTMLElement) {
            transformable.children[0].style.opacity = '';
        }
        if (transformable.children[1] instanceof HTMLElement) {
            transformable.children[1].style.opacity = '';
        }
    }
};

interface StyledSizeProps {
    $size: keyof typeof sizes;
}

export const StyledPickerItem = styled.div<StyledSizeProps>`
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    align-items: center;
    text-align: center;
    width: 100%;

    color: ${tertiary};

    cursor: pointer;
    user-select: none;
    scroll-snap-align: center;

    &:focus {
        outline: 0 none;
        background: none;
    }

    ${({ $size }) => sizes[$size]}
`;

const StyledTransformable = styled.div<StyledSizeProps>`
    width: 100%;
    height: 100%;

    flex-direction: column;
    transition: transform 0.1s ease;
    transform: translate3d(0, 0, 0);

    ${({ $size }) =>
        $size === 's'
            ? css`
                  top: 0;
              `
            : css`
                  top: -0.025em;
              `}
`;

const StyledText = styled.span`
    transform: translate3d(0, 0, 0);
`;

export const StyledWhiteText = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${secondary};
`;

export interface PickerItemProps extends React.HTMLAttributes<HTMLDivElement>, SizeProps {
    item: Item;
}

export const PickerItem: React.FC<PickerItemProps> = ({ size = 's', item, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();

    return (
        <StyledPickerItem ref={itemRef} $size={size} {...rest}>
            <StyledTransformable $size={size}>
                <StyledText>{item.label}</StyledText>
                <StyledWhiteText>{item.label}</StyledWhiteText>
            </StyledTransformable>
        </StyledPickerItem>
    );
};
