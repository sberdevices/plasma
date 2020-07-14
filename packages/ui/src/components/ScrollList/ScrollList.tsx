import React from 'react';
import styled, { css } from 'styled-components';

import ListContext, { ListContextController } from './ListContext';

interface ScrollListProps {
    index: number;
    axis: 'x' | 'y';
    preventScroll?: boolean;
    className?: string;
    offset?: number;
    onChange?: (index: number, prevIndex: number) => void;
}

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

interface StyledRootProps {
    axis: ScrollListProps['axis'];
}
const StyledRoot = styled.div<StyledRootProps>`
    position: relative;

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

const StyledWrapper = styled.div<StyledRootProps>`
    align-items: center;
    position: relative;
    transition: transform 0.4s ease-in-out;

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
    onChange,
}) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    const [prevIndex, setPrevIndex] = React.useState(index);
    const [position, setPosition] = React.useState(0);

    const ctx = React.useMemo(() => new ListContextController(), []);

    React.useEffect(() => {
        // направление движения: вперёд=1, назад=-1
        const direction = index - prevIndex;
        const rootRect = rootRef.current?.getBoundingClientRect();
        const scrollRect = scrollRef.current?.getBoundingClientRect();
        const item = ctx.getItem(index)?.current;

        if (index < 0) {
            setPosition(-offset);
        } else if (axis === 'x') {
            const rootWidth = rootRect ? rootRect.width : 0;
            const rootX = rootRect ? rootRect.x : 0;
            const scrollWidth = scrollRect ? scrollRect.width : 0;

            if (rootWidth > 0 && scrollWidth > 0) {
                if (item) {
                    const itemRect = item.getBoundingClientRect();

                    if (itemRect) {
                        const itemX = itemRect.x - rootX;

                        if ((index <= 0 && itemX < 0) || direction === 0) {
                            setPosition(-offset);
                        } else if (direction > 0 && itemX > rootWidth - itemRect.width - offset) {
                            setPosition(item.offsetLeft - rootWidth + itemRect.width + offset);
                        } else if (direction < 0 && itemX < offset) {
                            setPosition(item.offsetLeft - offset);
                        }
                    }
                }
            }
        } else if (axis === 'y') {
            const rootHeight = rootRect ? rootRect.height : 0;
            const rootY = rootRect ? rootRect.y : 0;
            const scrollHeight = scrollRect ? scrollRect.height : 0;

            if (rootHeight > 0 && scrollHeight > 0) {
                if (item) {
                    const itemRect = item.getBoundingClientRect();

                    if (itemRect) {
                        const itemY = itemRect.y - rootY;

                        if (index <= 0 || direction === 0) {
                            setPosition(-offset);
                        } else if (direction > 0 && itemY > rootHeight - itemRect.height - offset) {
                            setPosition(item.offsetTop - rootHeight + itemRect.height + offset);
                        } else if (direction < 0 && itemY < offset) {
                            setPosition(item.offsetTop - offset);
                        }
                    }
                }
            }
        }
        setPrevIndex(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx, index]);

    React.useEffect(() => {
        if (onChange && index !== prevIndex) {
            onChange(index, prevIndex);
        }
    });

    const handleScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            if (preventScroll) {
                if (axis === 'x') {
                    e.currentTarget.scrollLeft = 0;
                } else if (axis === 'y') {
                    e.currentTarget.scrollTop = 0;
                }
            }
        },
        [axis, preventScroll],
    );

    return (
        <ListContext.Provider value={ctx}>
            <StyledRoot ref={rootRef} className={className} onScroll={handleScroll} axis={axis}>
                <StyledWrapper ref={scrollRef} style={resolveInlineStyle(axis, position)} axis={axis}>
                    {children}
                </StyledWrapper>
            </StyledRoot>
        </ListContext.Provider>
    );
};

export default ScrollList;
