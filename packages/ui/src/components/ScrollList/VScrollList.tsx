import React from 'react';
import styled from 'styled-components';

import ListContext, { ListContextController } from './ListContext';

interface VScrollListProps {
    index: number;
    itemHeight: number;
    className?: string;
    onChange?: (index: number, prevIndex: number) => void;
}

const StyledRoot = styled.div`
    position: relative;
    overflow-y: hidden;
`;

const StyledScroll = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    transition: transform 0.4s ease-in-out;
`;

export const VScrollList: React.FC<VScrollListProps> = ({ children, className, index, itemHeight, onChange }) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    const [prevIndex, setPrevIndex] = React.useState(index);
    const [offset, setOffset] = React.useState(0);

    const ctx = React.useMemo(() => new ListContextController(), []);

    React.useEffect(() => {
        const direction = index - prevIndex;
        const rootRect = rootRef.current?.getBoundingClientRect();
        const rootHeight = rootRect ? rootRect.height : 0;
        const rootY = rootRect ? rootRect.y : 0;
        const scrollHeight = scrollRef.current ? scrollRef.current.getBoundingClientRect().height : 0;

        const itemsOnScreen = Math.floor(rootHeight / itemHeight);
        const verticalOffset = (rootHeight - itemHeight * itemsOnScreen) / 2;

        if (index < 0) {
            setOffset(-verticalOffset);
        } else if (rootHeight > 0 && scrollHeight > 0) {
            const itemRect = ctx.getItem(index)?.current?.getBoundingClientRect();

            if (itemRect) {
                const itemY = itemRect.y - rootY;
                if (index <= 0 || direction === 0) {
                    setOffset(-verticalOffset);
                } else if (direction > 0 && itemY > rootHeight - itemHeight * 2) {
                    setOffset(index * itemHeight - rootHeight + itemHeight * 2 + verticalOffset);
                } else if (direction < 0 && itemY < itemHeight * 2) {
                    setOffset(index * itemHeight - itemHeight - verticalOffset);
                }
            } else {
                setOffset(index * itemHeight - verticalOffset);
            }
        }

        setPrevIndex(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx, index, itemHeight]);

    React.useEffect(() => {
        if (onChange && index !== prevIndex) {
            onChange(index, prevIndex);
        }
    });

    const preventScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
        e.currentTarget.scrollTop = 0;
    }, []);

    return (
        <ListContext.Provider value={ctx}>
            <StyledRoot ref={rootRef} className={className} onScroll={preventScroll}>
                <StyledScroll ref={scrollRef} style={{ transform: `translateY(${-1 * offset}px)` }}>
                    {children}
                </StyledScroll>
            </StyledRoot>
        </ListContext.Provider>
    );
};

export default VScrollList;
