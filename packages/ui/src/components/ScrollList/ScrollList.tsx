import React from 'react';
import styled, { css } from 'styled-components';

import { ListContext, ListContextController } from './ListContext';

interface ScrollListCalcPositionProps {
    /**
     * Ось движения
     */
    axis: 'x' | 'y';
    /**
     * Текущий индекс элемента
     */
    index: number;
    /**
     * Смещение, которое необходимо задать в начале и в конце оси смещения
     */
    offset: number;
    /**
     * Направление движения по оси
     */
    direction: number;
    /**
     * DOMRect корневого контейнера
     */
    rootRect: DOMRect;
    /**
     * DOMRect контейнера, содержащего все элементы списка
     */
    scrollRect: DOMRect;
    /**
     * Ссылка на DOM текущего элемента
     */
    item: HTMLElement;
    /**
     * Предыдущее значения смещения
     */
    prevPosition: number;
}

export type ScrollListCalcPosition = (params: ScrollListCalcPositionProps) => number;

interface ScrollListProps {
    index: number;
    axis: 'x' | 'y';
    /**
     * Фиксирует скролл. Необходимо при использовании вместе с spatnav
     */
    preventScroll?: boolean;
    className?: string;
    /**
     * Горизонтальное/вертикальное смещение, относительно начала и конца списка
     */
    offset?: number;
    /**
     * Длительность перехода трансформации, в милисекундах
     */
    transitionDuration?: number;
    onChange?: (index: number, prevIndex: number) => void;
    calcPosition?: ScrollListCalcPosition;
    /**
     * Функция вызывается при старте анимации списка
     */
    onAnimationStart?: (event: TransitionEvent, direction: number) => void;
    /**
     * Функция вызывается при завершении анимации списка
     */
    onAnimationEnd?: (event: TransitionEvent, direction: number) => void;
}

/**
 * Функция по-умолчания для расчёта смещения списка
 */
export const calcPositionDefault: ScrollListCalcPosition = ({
    index,
    axis,
    rootRect,
    scrollRect,
    item,
    direction,
    offset,
    prevPosition,
}) => {
    if (index < 0) {
        return -offset;
    }

    if (axis === 'x') {
        const rootWidth = rootRect.width;
        const rootX = rootRect ? rootRect.x : 0;
        const scrollWidth = scrollRect.width;

        if (rootWidth > 0 && scrollWidth > 0) {
            const itemRect = item.getBoundingClientRect();
            const itemX = itemRect.x - rootX;

            if (index <= 0 && itemX < 0) {
                return -offset;
            }

            if (direction >= 0 && itemX > rootWidth - itemRect.width - offset) {
                return item.offsetLeft - rootWidth + itemRect.width + offset;
            }

            if (direction < 0 && itemX < offset) {
                return item.offsetLeft - offset;
            }
        }
    } else if (axis === 'y') {
        const rootHeight = rootRect.height;
        const rootY = rootRect.y;
        const scrollHeight = scrollRect.height;

        if (rootHeight > 0 && scrollHeight > 0) {
            const itemRect = item.getBoundingClientRect();
            const itemY = itemRect.y - rootY;

            if (index <= 0) {
                return -offset;
            }

            if (direction >= 0 && itemY > rootHeight - itemRect.height - offset) {
                return item.offsetTop - rootHeight + itemRect.height + offset;
            }

            if (direction < 0 && itemY < offset) {
                return item.offsetTop - offset;
            }
        }
    }

    return prevPosition;
};

function resolveInlineStyle(axis: ScrollListProps['axis'], position: number): React.CSSProperties {
    switch (axis) {
        case 'x':
            return {
                transform: `translateX(${-1 * position}px)`,
            };
        case 'y':
            return {
                transform: `translateY(${-1 * position}px)`,
            };
        default:
            return {};
    }
}

type StyledRootProps = Pick<ScrollListProps, 'axis'>;
const StyledRoot = styled.div<StyledRootProps>`
    position: relative;
    box-sizing: border-box;

    ${({ axis }) => {
        switch (axis) {
            case 'x':
                return css`
                    overflow-x: hidden;
                    width: 100%;
                `;

            case 'y':
                return css`
                    overflow-y: hidden;
                `;

            default:
                return null;
        }
    }}
`;

type StyledWrapperProps = Pick<ScrollListProps, 'axis' | 'transitionDuration'>;
const StyledWrapper = styled.div<StyledWrapperProps>`
    position: relative;

    align-items: center;
    box-sizing: border-box;

    ${({ transitionDuration }) =>
        transitionDuration &&
        css`
            transition: transform ${transitionDuration}ms ease-in-out;
        `};

    ${({ axis }) => {
        switch (axis) {
            case 'x':
                return css`
                    display: inline-flex;
                    white-space: nowrap;
                `;

            case 'y':
                return css`
                    display: flex;
                    flex-direction: column;
                `;

            default:
                return null;
        }
    }}
`;

export const ScrollList: React.FC<ScrollListProps> = ({
    axis,
    children,
    className,
    index,
    offset = 0,
    preventScroll = false,
    transitionDuration = 400,
    onChange,
    calcPosition,
    onAnimationStart,
    onAnimationEnd,
}) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const prevIndex = React.useRef(index);

    /**
     * направление движения:
     * -1: назад
     *  0: не изменилось
     *  1: вперёд
     */
    const direction = React.useRef(0);

    const [position, setPosition] = React.useState(-offset);

    const ctx = React.useMemo(() => new ListContextController(), []);

    React.useEffect(() => {
        setPosition((prevPosition) => {
            direction.current = index - prevIndex.current;

            const rootRect = rootRef.current?.getBoundingClientRect();
            const scrollRect = scrollRef.current?.getBoundingClientRect();
            const item = ctx.getItem(index)?.current;

            if (rootRect && scrollRect && item) {
                const params: ScrollListCalcPositionProps = {
                    direction: direction.current,
                    prevPosition,
                    axis,
                    index,
                    offset,
                    rootRect,
                    scrollRect,
                    item,
                };

                const nextPosition = calcPosition ? calcPosition(params) : calcPositionDefault(params);
                prevIndex.current = index;
                return nextPosition;
            }

            return prevPosition;
        });
    }, [ctx, index, axis, calcPosition, offset]);

    React.useEffect(() => {
        if (onChange && index !== prevIndex.current) {
            onChange(index, prevIndex.current);
        }
    });

    const handleScroll = React.useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            if (preventScroll) {
                if (axis === 'x') {
                    event.currentTarget.scrollLeft = 0;
                } else if (axis === 'y') {
                    event.currentTarget.scrollTop = 0;
                }
            }
        },
        [axis, preventScroll],
    );

    const handleTransitionStart = React.useCallback(
        (event: TransitionEvent) => {
            if (onAnimationStart && event.target === scrollRef.current) {
                onAnimationStart(event, direction.current);
            }
        },
        [onAnimationStart],
    );

    const handleTransitionEnd = React.useCallback(
        (event: TransitionEvent) => {
            if (onAnimationEnd && event.target === scrollRef.current) {
                onAnimationEnd(event, direction.current);
            }
        },
        [onAnimationEnd],
    );

    React.useLayoutEffect(() => {
        const node = scrollRef.current;
        if (node) {
            node.addEventListener('transitionstart', handleTransitionStart);
            node.addEventListener('transitionend', handleTransitionEnd);
        }

        return () => {
            if (node) {
                node.removeEventListener('transitionstart', handleTransitionStart);
                node.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
    }, [handleTransitionStart, handleTransitionEnd]);

    return (
        <ListContext.Provider value={ctx}>
            <StyledRoot ref={rootRef} className={className} onScroll={handleScroll} axis={axis}>
                <StyledWrapper
                    ref={scrollRef}
                    style={resolveInlineStyle(axis, position)}
                    axis={axis}
                    // если `direction` не определён, то отключаем анимацию. Кейс: переход на другую страницу
                    // из середины списка с последующим возвратом назад: если оставить анимацию,
                    // то список будет скролить от 0 до текущей позиции
                    transitionDuration={direction.current !== 0 ? transitionDuration : undefined}
                >
                    {children}
                </StyledWrapper>
            </StyledRoot>
        </ListContext.Provider>
    );
};
