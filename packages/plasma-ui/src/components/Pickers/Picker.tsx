import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@sberdevices/plasma-tokens';
import { IconChevronUp, IconChevronDown } from '@sberdevices/plasma-icons';
import { applyDisabled, DisabledProps } from '@sberdevices/plasma-core';

import { useRemoteListener } from '../../hooks';
import { Button } from '../Button';
import { Carousel, CarouselProps } from '../Carousel';

import { PickerItem, StyledPickerItem, StyledWhiteText } from './PickerItem';
import type { Item, SizeProps } from './types';
import { scaleCallbackS, scaleCallbackL, scaleResetCallback } from './utils';

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

const StyledDivButton = styled.div`
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
const StyledCarousel = styled(Carousel)`
    mask-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%);

    &[data-no-scroll-behavior='true'] {
        scroll-behavior: unset;
    }

    &:focus {
        outline: 0 none;

        & ${StyledWhiteText} {
            color: ${primary};
        }

        & ~ ${StyledDivButton} {
            opacity: 0.32;
        }
    }
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

const getIndex = (index: number, cmd: '+' | '-', min: number, max: number) => {
    if (cmd === '+') {
        return index !== max ? index + 1 : min;
    }
    return index !== min ? index - 1 : max;
};

export interface PickerProps
    extends SizeProps,
        DisabledProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
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
}

export const Picker: React.FC<PickerProps> = ({
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
    ...rest
}) => {
    const min = 0;
    const max = items.length - 1;
    const [index, setIndex] = React.useState(items.findIndex((item) => item.value === value));
    const noScrollBehavior = React.useRef(true);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const carouselRef = React.useRef<HTMLDivElement | null>(null);
    const toPrev = React.useCallback(() => !disabled && setIndex(getIndex(index, '-', min, max)), [index, min, max]);
    const toNext = React.useCallback(() => !disabled && setIndex(getIndex(index, '+', min, max)), [index, min, max]);

    // Навигация с помощью пульта/клавиатуры
    // Не перелистывает, если компонент неактивен
    useRemoteListener((key, event) => {
        if (carouselRef.current !== document.activeElement) {
            return;
        }
        if (key !== 'UP' && key !== 'DOWN') {
            return;
        }
        event.preventDefault();
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
    });

    React.useEffect(() => {
        if (autofocus && carouselRef.current) {
            carouselRef.current.focus();
        }
        /**
         * Удаляем аттрибут отключения анимации без перерендера компонента.
         */
        if (carouselRef.current) {
            carouselRef.current.removeAttribute('data-no-scroll-behavior');
        }
        noScrollBehavior.current = false;
    }, []);

    return (
        <StyledWrapper
            id={id}
            ref={wrapperRef}
            $size={size}
            $disabled={disabled}
            $visibleItems={visibleItems}
            $controls={controls}
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
                onIndexChange={(i) => {
                    if (items[i] && items[i].value !== value) {
                        onChange?.(items[i]);
                    }
                }}
                {...(noScrollBehavior.current ? { 'data-no-scroll-behavior': true } : {})}
            >
                {items.map((item, i) => (
                    <PickerItem
                        key={`item:${i}`}
                        item={item}
                        index={i}
                        activeIndex={index}
                        tabIndex={-1}
                        size={size}
                        onClick={() => onChange?.(item)}
                    />
                ))}
            </StyledCarousel>
            {controls && (
                <>
                    <Button
                        data-placement="top"
                        forwardedAs={StyledDivButton}
                        tabIndex={-1}
                        view="clear"
                        disabled={disabled}
                        outlined={false}
                        contentLeft={<IconChevronUp size="s" />}
                        onClick={toPrev}
                    />
                    <Button
                        data-placement="bottom"
                        forwardedAs={StyledDivButton}
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
