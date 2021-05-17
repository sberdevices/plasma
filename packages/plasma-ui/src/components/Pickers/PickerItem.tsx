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
const slotSizes = {
    l: {
        // Размер (transform: scale) при slot = 0
        x0Scale: 1,
        // Размер при slot = 1
        x1Scale: 0.8,
        // Размер при slot = 2
        x2Scale: 0.8,
        // Коэффициент смещения по oY
        offsetFactor: 0.5,
        // Высота элемента
        height: 120,
    },
    s: {
        x0Scale: 1,
        x1Scale: 0.75,
        x2Scale: 0.5,
        offsetFactor: 0.5,
        height: 72,
    },
};

const round = (n: number) => Math.round(n * 100) / 100;

export type Item = {
    value: string | number | Date;
    label: string | number;
};
export type Size = keyof typeof sizes;
export interface SizeProps {
    /**
     * Размер компонента
     */
    size?: Size;
}

const fullOpacity = 1;
const noneOpacity = 0;

/**
 * Абстрактный просчет стилей в зависимости от слота,
 * не основываясь на реальном элементе списка.
 */
const getStyles = (slot: number, size: Size) => {
    const absSlot = Math.abs(slot);
    const ceilSlot = Math.ceil(absSlot) || 1;
    const normSlot = Math.min(absSlot, ceilSlot); // Нормализованное значение
    const progSlot = ceilSlot - normSlot; // Прогресс (от X до 0)
    const shift = (slotSizes[size].offsetFactor * slotSizes[size].height) / 2;
    let opacity;
    let offset;
    let scale;

    switch (true) {
        case absSlot <= 1:
            scale = round(progSlot * (slotSizes[size].x0Scale - slotSizes[size].x1Scale) + slotSizes[size].x1Scale);
            offset = round(slot * shift);
            opacity = round(progSlot * (fullOpacity - noneOpacity) + noneOpacity);
            break;
        case absSlot <= 2:
            scale = round(progSlot * (slotSizes[size].x1Scale - slotSizes[size].x2Scale) + slotSizes[size].x2Scale);
            offset = round(progSlot * shift * Math.sign(slot));
            opacity = noneOpacity;
            break;
        default:
            scale = round(progSlot * slotSizes[size].x2Scale);
            offset = round(((normSlot - 2) / (ceilSlot - 2)) * Math.sign(slot) * -1 * slotSizes[size].height);
            opacity = noneOpacity;
    }

    return {
        wrapper: {
            /*
             * Размер плавно уменьшается с увеличением значения slot
             */
            transform: `scale(${scale}) translate3d(0,${offset}px,0)`,
        },
        text: {
            /*
             * Непрозрачность уменьшается с увеличением значения slot
             */
            opacity: `${1 - opacity}`,
        },
        whiteText: {
            /*
             * Непрозрачность увеличивается с увеличением значения slot
             */
            opacity: `${opacity}`,
        },
    };
};

/**
 * Малый размер => большой размер
 * Серый текст => белый текст
 */
const scaleCallback = (size: Size) => (itemEl: HTMLElement, slot: number) => {
    const styles = getStyles(slot, size);

    if (itemEl.children[0] instanceof HTMLElement) {
        const wrapper = itemEl.children[0];
        wrapper.style.transform = styles.wrapper.transform;

        /**
         * Серый текст
         */
        if (wrapper.children[0] instanceof HTMLElement) {
            wrapper.children[0].style.opacity = styles.text.opacity;
        }
        /**
         * Белый текст
         */
        if (wrapper.children[1] instanceof HTMLElement) {
            wrapper.children[1].style.opacity = styles.whiteText.opacity;
        }
    }
};

export const scaleCallbackL = scaleCallback('l');
export const scaleCallbackS = scaleCallback('s');

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
    index: number;
    activeIndex: number;
}

export const PickerItem: React.FC<PickerItemProps> = ({ size = 's', item, index, activeIndex, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();
    /*
     * Выведем стили еще до того, как отработает коллбек стилей.
     * Тут важно, что для `slot` идут целочисленные значения.
     */
    const styles = React.useMemo(() => getStyles(index - activeIndex, size), [index, activeIndex, size]);

    return (
        <StyledPickerItem ref={itemRef} $size={size} {...rest}>
            <StyledTransformable $size={size} style={styles.wrapper}>
                <StyledText style={styles.text}>{item.label}</StyledText>
                <StyledWhiteText style={styles.whiteText}>{item.label}</StyledWhiteText>
            </StyledTransformable>
        </StyledPickerItem>
    );
};
