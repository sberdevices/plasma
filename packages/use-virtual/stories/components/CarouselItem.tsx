import React, { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { Card, CardBody, CardContent, Body1 } from '@sberdevices/plasma-ui';
// import { ListChildComponentProps } from 'react-window';
import styled, { css } from 'styled-components';

import { DEFAULT_VIRTUAL_ITEM_GAP } from '../constants';

const Column = styled.div<{ gap: number }>`
    box-sizing: border-box;
    padding-left: var(--plasma-grid-gutter);

    ${({ gap }) =>
        // для демо - поддержка горизонтальной и вертикальной ориентации
        css`
            padding-right: ${gap}px;
            padding-bottom: ${gap}px;
        `}
`;

type Props = {
    width: number;
    height: number;
    heavy?: boolean;
    item: {
        text: string;
        image: string;
    };
    style?: React.CSSProperties;
    gap?: number;
    observeItem?: (el: HTMLElement) => void;
    unobserveItem?: (el: HTMLElement) => void;
    focused: boolean;
    index: number;
    className?: string;
    isFocusAnimated?: boolean;
    background?: string;
};

export const CarouselItem = ({
    style,
    className,
    index,
    width,
    height,
    heavy,
    item,
    gap = DEFAULT_VIRTUAL_ITEM_GAP,
    observeItem,
    unobserveItem,
    focused,
    isFocusAnimated,
    background,
}: Props) => {
    if (heavy && typeof window !== 'undefined') {
        const end = performance.now() + 100;
        // eslint-disable-next-line no-empty
        while (performance.now() < end) {}
    }
    const color = background || (index % 2 ? 'red' : 'green');

    const elementRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (!observeItem || !unobserveItem) {
            return;
        }

        const element = elementRef.current;

        if (!element) {
            return;
        }
        observeItem(element);

        return () => unobserveItem(element);
    });

    const focusedProps = useMemo(
        () =>
            isFocusAnimated
                ? {
                      scaleOnFocus: true,
                      focused,
                  }
                : {
                      style: {
                          outline: focused ? 'dashed red' : 'none',
                      },
                  },
        [isFocusAnimated, focused],
    );

    return (
        <Column gap={gap} ref={elementRef} style={style} key={index} data-virtual-index={index} className={className}>
            <Card outlined {...focusedProps}>
                <CardBody>
                    <div
                        style={{
                            background: color,
                            width: `${width}px`,
                            height: `${height}px`,
                        }}
                    />
                    <CardContent cover>
                        <Body1>{`${index}. ${item.text}`}</Body1>
                    </CardContent>
                </CardBody>
            </Card>
        </Column>
    );
};

export const CarouselItemMemo = memo(CarouselItem);

export const CarouselItemMemoTransform = styled(CarouselItemMemo)<{
    horizontal?: boolean;
    start: number;
}>`
    position: absolute;
    top: 0;
    left: 0;

    ${({ horizontal = true, start }) => css`
        transform: ${horizontal ? `translateX(${start}px)` : `translateY(${start}px)`};
    `}
`;
