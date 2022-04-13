import React, { useMemo, useState, useRef, useCallback, useEffect, useContext } from 'react';
import type { FC, HTMLAttributes } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { primary } from '@sberdevices/plasma-tokens';
import { IconChevronUp, IconChevronDown } from '@sberdevices/plasma-icons';
import { applyDisabled, DisabledProps, useIsomorphicLayoutEffect } from '@sberdevices/plasma-core';

import { useRemoteListener } from '../../hooks';
import { Button } from '../Button';
import { Carousel, CarouselProps } from '../Carousel';

import { PickerItem, StyledPickerItem, StyledWhiteText } from './PickerItem';
import { DEFAULT_PICKER_SIZE, DEFAULT_VISIBLE_ITEMS } from './types';
import type { PickerItem as PickerItemType, SizeProps, PickerSize, PickerVisibleItems } from './types';
import { scaleCallbacks, scaleResetCallback, usePreviousValue } from './utils';
import { useFirstRender } from './hooks';

interface PickerStyle {
    /**
     * Высота контрола.
     */
    height: string;
    /**
     * Оверскролл сверху и снизу {(h - 1.5) / 2}.
     */
    padding: string;
}

const sizes: Record<PickerSize, Record<PickerVisibleItems, PickerStyle>> = {
    l: {
        3: {
            height: '14rem',
            padding: '6.25rem',
        },
        5: {
            height: '14rem',
            padding: '6.25rem',
        },
    },
    s: {
        3: {
            height: '8.5rem',
            padding: '3.5rem',
        },
        5: {
            height: '12rem',
            padding: '5.25rem',
        },
    },
    xs: {
        3: {
            height: '7.5rem',
            padding: '2.85rem',
        },
        5: {
            height: '10.75rem',
            padding: '4.625rem',
        },
    },
};
const masks = {
    l: {
        3: 'linear-gradient(rgba(0, 0, 0, 0) 0, rgb(0, 0, 0) 4.5rem, rgb(0, 0, 0) 9.5rem, rgba(0, 0, 0, 0) 14rem)',
        5: 'linear-gradient(rgba(0, 0, 0, 0) 0, rgb(0, 0, 0) 4.5rem, rgb(0, 0, 0) 9.5rem, rgba(0, 0, 0, 0) 14rem)',
    },
    s: {
        3: 'linear-gradient(rgba(0, 0, 0, 0) 0.875rem, rgb(0, 0, 0) 3.125rem, rgb(0, 0, 0) 5.375rem, rgba(0, 0, 0, 0) 7.625rem)',
        5: 'linear-gradient(rgba(0, 0, 0, 0) 0.75rem, rgb(0, 0, 0) 2.625rem, rgb(0, 0, 0) 9.375rem, rgba(0, 0, 0, 0) 11.25rem)',
    },
    xs: {
        3: 'linear-gradient(rgba(0, 0, 0, 0) 0.875rem, rgb(0, 0, 0) 2.125rem, rgb(0, 0, 0) 5.5rem, rgba(0, 0, 0, 0) 6.625rem)',
        5: 'linear-gradient(rgba(0, 0, 0, 0) 0.75rem, rgb(0, 0, 0) 1.625rem, rgb(0, 0, 0) 9.125rem, rgba(0, 0, 0, 0) 10rem)',
    },
};

const StyledArrow = styled(Button)`
    position: absolute;
    left: 0;
    right: 0;

    margin: 0 auto;
    padding: 0;
    width: 1.25rem;
    height: 1.25rem;

    opacity: 0;
    color: ${primary};

    &[data-placement='top'] {
        top: 0;
    }

    &[data-placement='bottom'] {
        bottom: 0;
    }
`;
const StyledCarousel = styled(Carousel)<{ $isFocused?: boolean }>`
    &[data-no-scroll-behavior='true'] {
        scroll-behavior: unset;
    }

    &:focus {
        outline: 0 none;
    }

    ${({ $isFocused }) =>
        $isFocused &&
        css`
            & ${StyledWhiteText} {
                color: ${primary};
            }

            & ~ ${StyledArrow} {
                opacity: 0.32;
            }
        `}
`;
interface StyledWrapperProps {
    $visibleItems: PickerVisibleItems;
    $size: PickerSize;
    $disabled?: boolean;
    $controls?: boolean;
    $isSingleItem?: boolean;
}
const StyledWrapper = styled.div<StyledWrapperProps>`
    position: relative;
    width: max-content;
    text-align: center;

    & + & {
        margin-left: 1rem;
    }

    ${({ $size, $visibleItems }) => css`
        height: ${sizes[$size][$visibleItems].height};

        ${StyledCarousel} {
            mask-image: ${masks[$size][$visibleItems]};
        }
    `};

    ${applyDisabled}

    ${({ $disabled }) =>
        $disabled &&
        css`
            ${StyledCarousel} {
                overflow: hidden;
            }

            ${StyledPickerItem} {
                cursor: not-allowed;
            }
        `}

    ${({ $controls }) =>
        $controls &&
        css`
            padding-top: 1.25rem;
            padding-bottom: 1.25rem;
        `}

    ${({ $isSingleItem }) =>
        $isSingleItem &&
        css`
            ${StyledCarousel} {
                overflow: hidden;
            }
        `}
`;

// Значение, отвечающее за количество элементов,
// перед которыми надо остановить скролл
const INDEX_STOP_BUFFER = 2;

function getAllIndices(items: PickerItemType[], value: string | number | Date) {
    const res: number[] = [];

    items.forEach((item, i) => {
        if (item.value === value) {
            res.push(i);
        }
    });

    return res;
}

const findItemIndex = (
    items: PickerItemType[],
    value: string | number | Date,
    infiniteScroll: boolean,
    isSingleItem: boolean,
) => {
    if (infiniteScroll && isSingleItem) {
        return Math.floor(items.length / 2);
    }

    if (infiniteScroll) {
        const middleIndex = 1;
        return getAllIndices(items, value)[middleIndex];
    }

    return items.findIndex((item) => item.value === value);
};

type GetIndexCmd = '+' | '-' | '++' | '--' | 'home' | 'end';

/**
 * Возвращает следующий/предыдущий индекс.
 */
const getIndex = (index: number, cmd: GetIndexCmd, min: number, max: number, infiniteScroll: boolean) => {
    switch (cmd) {
        case '+':
            return index !== max ? index + 1 : min;
        case '-':
            return index !== min ? index - 1 : max;
        case '++':
            return index + 10;
        case '--':
            return index - 10;
        case 'home':
            return infiniteScroll && min === index ? 0 : min;
        case 'end':
        default:
            // вычисления в первом выражении - это максимальный индекс виртуального списка
            return infiniteScroll && max === index ? (max - 1) / 2 + max + 1 : max;
    }
};

const getItems = (
    items: PickerItemType[],
    infiniteScroll: boolean,
    visibleItems: PickerVisibleItems,
    isSingleItem: boolean,
) => {
    if (infiniteScroll && isSingleItem) {
        return new Array(visibleItems).fill(items[0]);
    }

    if (infiniteScroll) {
        const virtualItems = items.map((item) => ({ ...item, isVirtual: true }));
        return [...virtualItems, ...items, ...virtualItems];
    }

    return items;
};

const isTopPosition = (i: number) => i < INDEX_STOP_BUFFER;

const isBottomPosition = (i: number, itemsLength: number) => i > itemsLength - 1 - INDEX_STOP_BUFFER;

export interface PickerProps
    extends SizeProps,
        DisabledProps,
        Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
        Pick<CarouselProps, 'scrollSnapType'> {
    /**
     * Список опций
     */
    items: PickerItemType[];
    /**
     * Значение компонента
     */
    value: string | number | Date;
    /**
     * Отображать стрелки для переключения
     */
    controls?: boolean;
    /**
     * Отображаемое количество опций
     */
    visibleItems?: PickerVisibleItems;
    /**
     * Обработчик изменения значения
     */
    onChange?: (value: PickerItemType) => void;
    /**
     * Компонент в фокусе (визуально, независимо от tabIndex)
     */
    focused?: boolean;
    /**
     * Автофокус на компоненте.
     */
    autofocus?: boolean;
    /**
     * Добавляет нативный инпут для отправки в формах. Используется `input[type=hidden]`
     */
    enableNativeControl?: boolean;
    /**
     * Имя нативного инпута. Полезно при отправке uncontrolled-форм.
     * Используется вместе с пропом `enableNativeControl`.
     */
    name?: string;
    /**
     * Бесконечная прокрутка; выключена по умолчанию для lowPerformance Devices
     */
    infiniteScroll?: boolean;
}

/**
 * Компонент для отображения барабана-пикера,
 * позволяющего визуально проскроллить опции вверх-вниз.
 */
export const Picker: FC<PickerProps> = ({
    id,
    size = DEFAULT_PICKER_SIZE,
    value,
    items,
    controls,
    autofocus,
    disabled,
    visibleItems = DEFAULT_VISIBLE_ITEMS,
    scrollSnapType,
    onChange,
    'aria-label': ariaLabel,
    ...rest
}) => {
    const isSingleItem = items.length === 1;
    const min = 0;
    const max = items.length - 1;

    const theme = useContext(ThemeContext);
    // by default 'true' on high perfomance devices
    const infiniteScroll = rest.infiniteScroll ?? !theme?.lowPerformance;

    const virtualItems = useMemo(() => getItems(items, infiniteScroll, visibleItems, isSingleItem), [
        items,
        infiniteScroll,
        visibleItems,
        isSingleItem,
    ]);

    const isFirstRender = useFirstRender();
    const [isFocused, setIsFocused] = useState(false);
    const [index, setIndex] = useState(findItemIndex(virtualItems, value, infiniteScroll, isSingleItem));
    const [hasScrollAnim, setScrollAnim] = useState(true);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const toPrev = useCallback(
        () => !isSingleItem && !disabled && setIndex(getIndex(index, '-', min, max, infiniteScroll)),
        [isSingleItem, index, min, max, infiniteScroll],
    );
    const toNext = useCallback(
        () => !isSingleItem && !disabled && setIndex(getIndex(index, '+', min, max, infiniteScroll)),
        [isSingleItem, index, min, max, infiniteScroll],
    );
    const jump = useCallback(
        (cmd: GetIndexCmd) => {
            if (disabled) {
                return;
            }

            const firstRealItemsIndex = infiniteScroll ? max + 1 : min;
            const lastRealItemsIndex = infiniteScroll ? max * 2 + 1 : max;
            const newIndex = getIndex(index, cmd, firstRealItemsIndex, lastRealItemsIndex, infiniteScroll);

            setIndex(newIndex);
        },
        [index, max, min, items, virtualItems, infiniteScroll],
    );

    const prevValue = usePreviousValue(virtualItems[index]?.value);

    const onFocus = useCallback(() => setIsFocused(true), []);

    const onBlur = useCallback(() => setIsFocused(false), []);

    // Изменяет индекс выделенного элемента
    // при обновлении значения value извне
    useIsomorphicLayoutEffect(() => {
        const newIndex = findItemIndex(virtualItems, value, infiniteScroll, isSingleItem);

        // Отключаем анимацию скролла, если значение компонента осталось
        // прежним, но индекс изменился
        if (prevValue === virtualItems[newIndex]?.value && newIndex !== index) {
            setScrollAnim(false);
        }

        // Отключаем анимацию скролла, если выбраны крайние значения реального массива (items)
        // при изменение value извне.
        // Например, есть изначальный массив значений: [0,1,2,3], где max = 3.
        // После добавления буферных значений для скролла, он становится [0,1,2,3,0,1,2,3,0,1,2,3],
        // в котором необходимо попадать на "средний сектор" без анимации, т.е. на элементы с индексом 4 или 7
        const firstRealItemsIndex = max + 1;
        const lastRealItemsIndex = max * 2 + 1;
        if (newIndex === firstRealItemsIndex || newIndex === lastRealItemsIndex) {
            setScrollAnim(false);
        }

        setIndex(newIndex);
    }, [value, virtualItems, infiniteScroll, max, isSingleItem]);

    // Навигация с помощью пульта/клавиатуры
    // Не перелистывает, если компонент неактивен
    useRemoteListener((key, event) => {
        if (!isFocused) {
            return;
        }
        switch (key) {
            case 'UP':
                toPrev();
                break;
            case 'DOWN':
                toNext();
                break;
            case 'PAGE_UP':
                jump('--');
                break;
            case 'PAGE_DOWN':
                jump('++');
                break;
            case 'HOME':
                jump('home');
                break;
            case 'END':
                jump('end');
                break;
            default:
                return;
        }
        event.preventDefault();
    });

    useEffect(() => {
        // Отключаем анимацию скролла при первом рендере
        setScrollAnim(false);
    }, []);

    const onIndexChange = useCallback(
        (i: number) => {
            if (i !== index) {
                setIndex(i);
            }

            if (virtualItems[i]?.value !== value) {
                onChange?.(virtualItems[i]);
            }

            // Изменяем выбранный индекс если значение не изменилось
            if (prevValue === virtualItems[i]?.value) {
                setScrollAnim(false);
                setIndex(i);
                const newIndex = findItemIndex(virtualItems, virtualItems[i].value, infiniteScroll, isSingleItem);
                setIndex(newIndex);
            }

            // Включаем анимацию скролла, после изменения индекса
            setScrollAnim(true);
        },
        [virtualItems, infiniteScroll, value, onChange, prevValue, isSingleItem],
    );

    const onDetectActiveItem = useCallback(
        (i: number) => {
            if (isSingleItem || !infiniteScroll || (!isTopPosition(i) && !isBottomPosition(i, virtualItems.length))) {
                return;
            }

            // Отключаем анимацию скролла, если полученный индекс за
            // пределами реального массива (items) и перебрасываем на
            // аналогичное значение в середину
            setScrollAnim(false);
            setIndex(i);

            if (isTopPosition(i)) {
                setIndex(i + (max - min) + 1);
                return;
            }

            if (isBottomPosition(i, virtualItems.length)) {
                setIndex(i - (max - min) - 1);
            }
        },
        [virtualItems, infiniteScroll, max, min, index, isSingleItem],
    );

    return (
        <StyledWrapper
            id={id}
            ref={wrapperRef}
            $size={size}
            $disabled={disabled}
            $visibleItems={visibleItems}
            $isSingleItem={isSingleItem}
            $controls={controls}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
        >
            <StyledCarousel
                ref={carouselRef}
                axis="y"
                index={index}
                scaleCallback={scaleCallbacks[size]}
                scaleResetCallback={scaleResetCallback}
                scrollSnapType={scrollSnapType}
                detectActive
                detectThreshold={0.5}
                throttleMs={125}
                paddingStart={sizes[size][visibleItems].padding}
                paddingEnd={sizes[size][visibleItems].padding}
                onIndexChange={onIndexChange}
                onDetectActiveItem={onDetectActiveItem}
                $isFocused={isFocused}
                listRole="listbox"
                listAriaLabel={ariaLabel}
                {...(hasScrollAnim ? {} : { 'data-no-scroll-behavior': true })}
            >
                {virtualItems.map((item, i) => (
                    <PickerItem
                        key={`item:${i}`}
                        item={item}
                        index={i}
                        activeIndex={index}
                        tabIndex={index === i ? 0 : -1}
                        size={size}
                        onItemClick={onChange}
                        noScrollBehavior={!hasScrollAnim}
                        autofocus={((isFirstRender && autofocus) || isFocused) && index === i}
                        role="option"
                        aria-hidden={item.isVirtual}
                        isSnapAlwaysStop={
                            i === min + INDEX_STOP_BUFFER || i === virtualItems.length - 1 - INDEX_STOP_BUFFER
                        }
                    />
                ))}
            </StyledCarousel>
            {controls && (
                <>
                    <StyledArrow
                        data-placement="top"
                        tabIndex={-1}
                        view="clear"
                        disabled={disabled}
                        outlined={false}
                        contentLeft={<IconChevronUp size="s" />}
                        aria-hidden="true"
                        onClick={toPrev}
                    />
                    <StyledArrow
                        data-placement="bottom"
                        tabIndex={-1}
                        view="clear"
                        disabled={disabled}
                        outlined={false}
                        contentLeft={<IconChevronDown size="s" />}
                        aria-hidden="true"
                        onClick={toNext}
                    />
                </>
            )}
        </StyledWrapper>
    );
};
