import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const StyledItem = styled.div<{ $gapY?: number }>`
    margin-bottom: ${({ $gapY }) => $gapY}px;
`;

interface ItemProps {
    width: string;
    cols: number;
}

export interface ElasticGridProps {
    /**
     * Минимальная ширина колонки в px
     */
    minColWidth: number;
    /**
     * Отступ между колонками в px
     */
    gapX?: number;
    /**
     * Отступ между рядами в px
     */
    gapY?: number;
}

/**
 * Компонент с резиновой сеткой
 */
export const ElasticGrid: React.FC<ElasticGridProps> = ({ children, minColWidth, gapX = 0, gapY = 0, ...props }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [itemProps, setItemProps] = useState<ItemProps>({
        width: `${minColWidth}px`,
        cols: 1,
    });

    const getItemStyle = (column: number) => ({
        width: itemProps.width,
        marginRight: (column + 1) % itemProps.cols === 0 ? '0' : `${gapX}px`,
    });

    useLayoutEffect(() => {
        const currentRef = containerRef.current;

        /* istanbul ignore if: убираем проверку на рефы из покрытия */
        if (!currentRef) return;

        const resizeObserver = new window.ResizeObserver(() => {
            const { width } = currentRef.getBoundingClientRect();
            const cols = Math.trunc(width / minColWidth);
            const scale = width / minColWidth / cols;
            const offsetSize = (gapX * (cols - 1)) / cols;

            setItemProps({
                width: `${minColWidth * scale - offsetSize}px`,
                cols,
            });
        });

        resizeObserver.observe(currentRef);

        return () => {
            resizeObserver.unobserve(currentRef);
        };
    }, [minColWidth, gapX]);

    return (
        <StyledContainer {...props} ref={containerRef}>
            {React.Children.map(children, (child, i) => (
                <StyledItem $gapY={gapY} style={getItemStyle(i)}>
                    {child}
                </StyledItem>
            ))}
        </StyledContainer>
    );
};
