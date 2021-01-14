import React from 'react';
import styled, { css } from 'styled-components';
import { primary, scalingPixelBasis } from '@sberdevices/plasma-tokens';
import { IconChevronUp, IconChevronDown } from '@sberdevices/plasma-icons';

import { applyDisabled, DisabledProps } from '../../mixins';
import { Button } from '../Button';
import { Carousel } from '../Carousel';

import {
    PickerItem,
    Item,
    SizeProps,
    scaleCallbackS,
    scaleCallbackL,
    scaleResetCallback,
    StyledWhiteText,
} from './PickerItem';

const StyledDivButton = styled.div`
    height: auto;
    padding: 0;
    opacity: 0;
    color: ${primary};
`;

const StyledWrapper = styled.div<DisabledProps>`
    width: max-content;
    text-align: center;

    &:focus {
        outline: 0 none;

        & ${StyledWhiteText} {
            color: ${primary};
        }

        & ${StyledDivButton} {
            opacity: 0.32;
        }
    }

    ${applyDisabled}
`;

const sizes = {
    l: {
        3: {
            height: `${200 / scalingPixelBasis}rem`,
            padding: `${100 / scalingPixelBasis}rem`,
        },
        5: {
            height: '0',
            padding: '0',
        },
    },
    s: {
        3: {
            height: `${112 / scalingPixelBasis}rem`,
            padding: `${56 / scalingPixelBasis}rem`,
        },
        5: {
            height: `${168 / scalingPixelBasis}rem`,
            padding: `${84 / scalingPixelBasis}rem`,
        },
    },
};

interface StyledCarouselProps {
    visibleItems: 3 | 5;
    $size: 'l' | 's';
}

const StyledCarousel = styled(Carousel)<StyledCarouselProps>`
    ${({ $size, visibleItems }) => css`
        height: ${sizes[$size][visibleItems].height};
    `};

    -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%);
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
     * Компонент в фокусе
     */
    focused?: boolean;
}

export const Picker: React.FC<PickerProps> = ({
    size = 's',
    value,
    items,
    controls,
    disabled,
    onChange,
    visibleItems = 5,
    ...rest
}) => {
    const count = items.length;
    const min = 0;
    const max = count - 1;
    const index = items.findIndex((item) => item.value === value);
    const toPrev = React.useCallback(() => onChange?.(items[getIndex(index, '-', min, max)]), [index, min, max]);
    const toNext = React.useCallback(() => onChange?.(items[getIndex(index, '+', min, max)]), [index, min, max]);

    return (
        <StyledWrapper disabled={disabled} tabIndex={0} {...rest}>
            {controls && (
                <Button
                    as={StyledDivButton}
                    view="clear"
                    outlined={false}
                    contentLeft={<IconChevronUp />}
                    onClick={toPrev}
                />
            )}
            <StyledCarousel
                $size={size}
                visibleItems={visibleItems}
                axis="y"
                index={index}
                scaleCentral
                scaleCallback={size === 's' ? scaleCallbackS : scaleCallbackL}
                scaleResetCallback={scaleResetCallback}
                animatedScrollByIndex={controls}
                scrollSnap={!controls}
                scrollSnapType="mandatory"
                detectCentral={!controls}
                detectThreshold={0.5}
                onIndexChange={(i) => onChange?.(items[i])}
                paddingStart={sizes[size][visibleItems].padding}
                paddingEnd={sizes[size][visibleItems].padding}
            >
                {items.map((item, i) => (
                    <PickerItem key={`item:${i}`} item={item} size={size} onClick={() => onChange?.(item)} />
                ))}
            </StyledCarousel>
            {controls && (
                <Button
                    as={StyledDivButton}
                    view="clear"
                    outlined={false}
                    contentLeft={<IconChevronDown />}
                    onClick={toNext}
                />
            )}
        </StyledWrapper>
    );
};
