import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const StyledItem = styled.div<{ $gapY?: number }>`
    margin-bottom: ${({ $gapY }) => $gapY}px;
`;

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

    useLayoutEffect(() => {
        const currentRef = containerRef.current;

        if (!currentRef) return;

        const resizeObserver = new window.ResizeObserver((entries) => {
            if (!Array.isArray(entries) || !entries.length) return;

            const { width } = currentRef.getBoundingClientRect();
            const cols = Math.trunc(width / minColWidth);
            const scale = width / minColWidth / cols;
            const offsetSize = (gapX * (cols - 1)) / cols;
            const nodes = currentRef.children;

            for (let i = 0; i < nodes.length; i++) {
                const el = nodes[i] as HTMLDivElement;
                el.style.width = `${minColWidth * scale - offsetSize}px`;
                el.style.marginRight = (i + 1) % cols === 0 ? '0' : `${gapX}px`;
            }
        });

        resizeObserver.observe(currentRef);

        return () => {
            resizeObserver.unobserve(currentRef);
        };
    }, [minColWidth, gapX]);

    return (
        <StyledContainer {...props} ref={containerRef}>
            {React.Children.map(children, (child) => (
                <StyledItem $gapY={gapY}>{child}</StyledItem>
            ))}
        </StyledContainer>
    );
};
