import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@sberdevices/plasma-tokens';
import { IconChevronUp, IconChevronDown } from '@sberdevices/plasma-icons';
import { applyDisabled, DisabledProps } from '@sberdevices/plasma-core';

import { useRemoteListener } from '../../hooks';
import { Button } from '../Button';
import { Carousel } from '../Carousel';

import {
    PickerItem,
    Item,
    SizeProps,
    scaleCallbackS,
    scaleCallbackL,
    scaleResetCallback,
    StyledPickerItem,
    StyledWhiteText,
} from './PickerItem';

const sizes = {
    l: {
        3: {
            height: '12.5rem',
            padding: '6.25rem',
        },
        5: {
            height: '12.5rem',
            padding: '6.25rem',
        },
    },
    s: {
        3: {
            height: '7rem',
            padding: '3.5rem',
        },
        5: {
            height: '10.5rem',
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

    &:focus {
        outline: 0 none;

        & ${StyledWhiteText} {
            color: ${primary};
        }

        & ${StyledDivButton} {
            opacity: 0.32;
        }
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

export interface PickerProps extends SizeProps, DisabledProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
    onChange,
    ...rest
}) => {
    const min = 0;
    const max = items.length - 1;
    const index = items.findIndex((item) => item.value === value);
    const noScrollBehavior = React.useRef(true);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const carouselRef = React.useRef<HTMLDivElement | null>(null);
    const toPrev = React.useCallback(() => !disabled && onChange?.(items[getIndex(index, '-', min, max)]), [
        index,
        min,
        max,
    ]);
    const toNext = React.useCallback(() => !disabled && onChange?.(items[getIndex(index, '+', min, max)]), [
        index,
        min,
        max,
    ]);

    // Навигация с помощью пульта/клавиатуры
    // Не перелистывает, если компонент неактивен
    useRemoteListener((key, event) => {
        if (wrapperRef.current !== document.activeElement) {
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
        if (autofocus && wrapperRef.current) {
            wrapperRef.current.focus();
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
            tabIndex={tabIndex}
            $size={size}
            $disabled={disabled}
            $visibleItems={visibleItems}
            $controls={controls}
            {...rest}
        >
            <StyledCarousel
                ref={carouselRef}
                axis="y"
                index={index}
                scaleCallback={size === 's' ? scaleCallbackS : scaleCallbackL}
                scaleResetCallback={scaleResetCallback}
                scrollSnapType="mandatory"
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
                        view="clear"
                        disabled={disabled}
                        outlined={false}
                        contentLeft={<IconChevronUp size="s" />}
                        onClick={toPrev}
                    />
                    <Button
                        data-placement="bottom"
                        forwardedAs={StyledDivButton}
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
