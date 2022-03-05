import React, { useEffect } from 'react';
import styled, { css, CSSObject } from 'styled-components';
import { secondary, tertiary, display2, headline1, headline2 } from '@sberdevices/plasma-tokens';

import { useCarouselItem } from '../Carousel';

import type { SizeProps, PickerSize, PickerItem as PickerItemType } from './types';
import { getStyles } from './utils';

const sizes: Record<PickerSize, CSSObject> = {
    l: {
        ...display2,
        padding: '0.5rem 0',
    },
    s: {
        ...headline1,
        fontWeight: 600,
        padding: 0,
    },
    xs: {
        ...headline2,
        padding: 0,
    },
};

interface StyledSizeProps {
    $size: keyof typeof sizes;
    $noScrollBehavior: boolean;
}

export const StyledPickerItem = styled.div<StyledSizeProps>`
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;

    color: ${tertiary};

    cursor: pointer;
    user-select: none;

    ${({ $noScrollBehavior }) =>
        !$noScrollBehavior &&
        css`
            scroll-snap-align: center;
        `}

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

    ${({ $noScrollBehavior }) =>
        !$noScrollBehavior &&
        css`
            transition: transform 0.1s ease;
            transform: translate3d(0, 0, 0);
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
    item: PickerItemType;
    index: number;
    activeIndex: number;
    noScrollBehavior: boolean;
    onItemClick?: (item: PickerItemType) => void;
    /**
     * Автофокус на компоненте.
     */
    autofocus?: boolean;
}

export const PickerItem: React.FC<PickerItemProps> = ({
    size = 's',
    item,
    index,
    activeIndex,
    noScrollBehavior,
    onItemClick,
    autofocus,
    ...rest
}) => {
    const itemRef = useCarouselItem<HTMLDivElement>();
    /*
     * Выведем стили еще до того, как отработает коллбек стилей.
     * Тут важно, что для `slot` идут целочисленные значения.
     */
    const styles = React.useMemo(() => getStyles(index - activeIndex, size), [index, activeIndex, size]);

    const onClick = React.useCallback(() => {
        onItemClick?.(item);
    }, [item]);

    useEffect(() => {
        if (autofocus && itemRef.current) {
            itemRef.current.focus();
        }
    }, [autofocus]);

    return (
        <StyledPickerItem $noScrollBehavior={noScrollBehavior} ref={itemRef} $size={size} onClick={onClick} {...rest}>
            <StyledTransformable $noScrollBehavior={noScrollBehavior} $size={size} style={styles.wrapper}>
                <StyledText style={styles.text}>{item.label}</StyledText>
                <StyledWhiteText style={styles.whiteText} aria-hidden="true">
                    {item.label}
                </StyledWhiteText>
            </StyledTransformable>
        </StyledPickerItem>
    );
};
