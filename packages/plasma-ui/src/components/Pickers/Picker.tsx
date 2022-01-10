import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import type { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@sberdevices/plasma-tokens';
import { IconChevronUp, IconChevronDown } from '@sberdevices/plasma-icons';
import { applyDisabled, DisabledProps, useIsomorphicLayoutEffect } from '@sberdevices/plasma-core';

import { useRemoteListener } from '../../hooks';
import { Button } from '../Button';
import { Carousel, CarouselProps } from '../Carousel';

import { PickerItem, StyledPickerItem, StyledWhiteText } from './PickerItem';
import type { Item, SizeProps } from './types';
import { scaleCallbackS, scaleCallbackL, scaleResetCallback, usePreviousValue } from './utils';

const sizes = {
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
};

const StyledButton = styled(Button)`
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

            & ~ ${StyledButton} {
                opacity: 0.32;
            }
        `}
`;
interface StyledWrapperProps {
    $visibleItems: 3 | 5;
    $size: 'l' | 's';
    $disabled?: boolean;
    $controls?: boolean;
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
`;

// Значение, отвечающее за количество чисел,
// которое необходимо добавить перед и после основного списка
const ADDITIONAL_OFFSET = 1;

const findItemIndex = (
    items: Item[],
    value: string | number | Date,
    infiniteScroll: boolean,
    additionalOffset: number,
) => {
    const index = items.findIndex((item) => item.value === value);

    if (infiniteScroll && index === 0) {
        return items.length - additionalOffset * 2;
    }

    return index;
};

const getItems = (items: Item[], infiniteScroll: boolean, additionalOffset: number) => {
    if (!infiniteScroll) {
        return items;
    }

    const firstPart = items.slice(-additionalOffset);
    const lastPart = items.slice(0, additionalOffset);

    return [...firstPart, ...items, ...lastPart];
};

type GetIndexCmd = '+' | '-' | '++' | '--' | 'home' | 'end';

/**
 * Возвращает следующий/предыдущий индекс.
 */
const getIndex = (index: number, cmd: GetIndexCmd, min: number, max: number) => {
    switch (cmd) {
        case '+':
            return index !== max ? index + 1 : min;
        case '-':
            return index !== min ? index - 1 : max;
        case '++':
            return Math.min(max, index + 10);
        case '--':
            return Math.max(min, index - 10);
        case 'home':
            return min;
        case 'end':
        default:
            return max;
    }
};

export interface PickerProps
    extends SizeProps,
        DisabledProps,
        Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
        Pick<CarouselProps, 'scrollSnapType'> {
    /**
     * Список опций
     */
    items: Item[];
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
    visibleItems?: 3 | 5;
    /**
     * Обработчик изменения значения
     */
    onChange?: (value: Item) => void;
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
     * Бесконечная прокрутка
     */
    infiniteScroll?: boolean;
}

export const Picker: FC<PickerProps> = ({
    id,
    size = 's',
    value,
    items,
    controls,
    autofocus,
    disabled,
    visibleItems = 5,
    tabIndex = 0,
    scrollSnapType,
    onChange,
    infiniteScroll = true,
    ...rest
}) => {
    const virtualItems = useMemo(() => getItems(items, infiniteScroll, ADDITIONAL_OFFSET), [items, infiniteScroll]);

    const min = 0;
    const max = virtualItems.length - 1;
    const [index, setIndex] = useState(findItemIndex(virtualItems, value, infiniteScroll, ADDITIONAL_OFFSET));
    const [hasScrollAnim, setScrollAnim] = useState(true);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const toPrev = useCallback(() => !disabled && setIndex(getIndex(index, '-', min, max)), [index, min, max]);
    const toNext = useCallback(() => !disabled && setIndex(getIndex(index, '+', min, max)), [index, min, max]);
    const jump = useCallback(
        (cmd: GetIndexCmd) => {
            if (disabled) {
                return;
            }

            let newIndex = getIndex(index, cmd, 0, items.length - 1);

            if (cmd === 'home' || cmd === 'end') {
                newIndex = virtualItems.findIndex((item) => item.value === items[newIndex].value);
            }
            setIndex(newIndex);
        },
        [index, items, virtualItems],
    );

    const [isFocused, setIsFocused] = useState(false);

    const prevValue = usePreviousValue(virtualItems[index]?.value);

    // Изменяет индекс выделенного элемента
    // при обновлении значения value извне
    useIsomorphicLayoutEffect(() => {
        const newIndex = findItemIndex(virtualItems, value, infiniteScroll, ADDITIONAL_OFFSET);

        // Отключаем анимацию скролла, если значение компонента осталось
        // прежним, но индекс изменился
        if (prevValue === virtualItems[newIndex]?.value && newIndex !== index) {
            setScrollAnim(false);
        }

        // Отключаем анимацию скролла, если выбраны крайние значения в списке
        const offset = ADDITIONAL_OFFSET * 2;
        if (newIndex === offset - 1 || newIndex === virtualItems.length - offset) {
            setScrollAnim(false);
        }

        setIndex(newIndex);
    }, [value, virtualItems]);

    // Навигация с помощью пульта/клавиатуры
    // Не перелистывает, если компонент неактивен
    useRemoteListener((key, event) => {
        if (carouselRef.current !== document.activeElement) {
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
        if (autofocus && carouselRef.current) {
            carouselRef.current.focus();
        }
        // Отключаем анимацию скролла при первом рендере
        setScrollAnim(false);
    }, []);

    const onIndexChange = useCallback(
        (i: number) => {
            if (virtualItems[i]?.value !== value) {
                onChange?.(virtualItems[i]);
            }

            // Изменяем выбранный индекс если значение не изменилось
            if (prevValue === virtualItems[i]?.value) {
                setScrollAnim(false);
                setIndex(i);
                const newIndex = findItemIndex(virtualItems, virtualItems[i].value, infiniteScroll, ADDITIONAL_OFFSET);
                setIndex(newIndex);
            }

            // Включаем анимацию скролла, после изменения индекса
            setScrollAnim(true);
        },
        [virtualItems, value, onChange, prevValue],
    );

    return (
        <StyledWrapper
            id={id}
            ref={wrapperRef}
            $size={size}
            $disabled={disabled}
            $visibleItems={visibleItems}
            $controls={controls}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
        >
            <StyledCarousel
                ref={carouselRef}
                tabIndex={tabIndex}
                axis="y"
                index={index}
                scaleCallback={size === 's' ? scaleCallbackS : scaleCallbackL}
                scaleResetCallback={scaleResetCallback}
                scrollSnapType={scrollSnapType}
                detectActive
                detectThreshold={0.5}
                paddingStart={sizes[size][visibleItems].padding}
                paddingEnd={sizes[size][visibleItems].padding}
                onIndexChange={onIndexChange}
                $isFocused={isFocused}
                {...(hasScrollAnim ? {} : { 'data-no-scroll-behavior': true })}
            >
                {virtualItems.map((item, i) => (
                    <PickerItem
                        key={`item:${i}`}
                        item={item}
                        index={i}
                        activeIndex={index}
                        tabIndex={-1}
                        size={size}
                        onItemClick={onChange}
                        noScrollBehavior={!hasScrollAnim}
                    />
                ))}
            </StyledCarousel>
            {controls && (
                <>
                    <StyledButton
                        data-placement="top"
                        tabIndex={-1}
                        view="clear"
                        disabled={disabled}
                        outlined={false}
                        contentLeft={<IconChevronUp size="s" />}
                        onClick={toPrev}
                    />
                    <StyledButton
                        data-placement="bottom"
                        tabIndex={-1}
                        view="clear"
                        disabled={disabled}
                        outlined={false}
                        contentLeft={<IconChevronDown size="s" />}
                        onClick={toNext}
                    />
                </>
            )}
        </StyledWrapper>
    );
};
