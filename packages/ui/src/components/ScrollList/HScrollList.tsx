import React from 'react';
import styled from 'styled-components';

import ListContext, { ListContextController } from './ListContext';

interface HScrollListProps {
    index: number;
    itemWidth: number;
    className?: string;
    onChange?: (index: number, prevIndex: number) => void;
}

const StyledRoot = styled.div`
    position: relative;
    overflow-x: hidden;
    width: 100%;
`;

const StyledWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    transition: transform 0.4s ease-in-out;
`;

export const HScrollList: React.FC<HScrollListProps> = ({ children, className, index, itemWidth, onChange }) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    const [prevIndex, setPrevIndex] = React.useState(index);
    const [offset, setOffset] = React.useState(0);

    const ctx = React.useMemo(() => new ListContextController(), []);

    React.useEffect(() => {
        // направление движения: вперёд=1, назад=-1
        const direction = index - prevIndex;
        const rootWidth = rootRef.current ? rootRef.current.getBoundingClientRect().width : 0;
        const scrollWidth = scrollRef.current ? scrollRef.current.getBoundingClientRect().width : 0;

        const itemsOnScreen = Math.floor(rootWidth / itemWidth);
        const sideOffset = (rootWidth - itemWidth * itemsOnScreen) / 2;

        if (index < 0) {
            setOffset(-sideOffset);
        } else if (rootWidth > 0 && scrollWidth > 0) {
            const rect = ctx.getItem(index)?.current?.getBoundingClientRect();

            if (rect) {
                if ((index <= 0 && rect.x < 0) || direction === 0) {
                    setOffset(-sideOffset);
                } else if (direction > 0 && rect.x > rootWidth - itemWidth) {
                    setOffset(index * itemWidth - rootWidth + itemWidth + sideOffset);
                } else if (direction < 0 && rect.x < 0) {
                    setOffset(index * itemWidth - sideOffset);
                }
            } else {
                setOffset(index * itemWidth - sideOffset);
            }
        }

        setPrevIndex(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    React.useEffect(() => {
        if (onChange && index !== prevIndex) {
            onChange(index, prevIndex);
        }
    });

    const preventScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
        e.currentTarget.scrollLeft = 0;
    }, []);

    return (
        <ListContext.Provider value={ctx}>
            <StyledRoot ref={rootRef} className={className} onScroll={preventScroll}>
                <StyledWrapper
                    ref={scrollRef}
                    style={{
                        transform: `translateX(${-1 * offset}px)`,
                    }}
                >
                    {children}
                </StyledWrapper>
            </StyledRoot>
        </ListContext.Provider>
    );
};

export default HScrollList;
