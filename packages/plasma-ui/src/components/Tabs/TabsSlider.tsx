import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { surfaceCard } from '@sberdevices/plasma-tokens';

import { useTabsContext } from './TabsContext';

export const activeItemStyle = css`
    background-color: ${surfaceCard};
    box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05);
`;

export const StyledSlider = styled.div`
    position: absolute;
    z-index: -1;

    min-width: 0%;
    border-radius: var(--tab-item-border-radius);

    transition: left 0.2s ease-in-out, width 0.2s ease-in-out;

    ${activeItemStyle};

    pointer-events: none;
`;

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
    activeIndex: number;
}

/**
 * Слайдер переключения табов
 */
export const TabsSlider: React.FC<SliderProps> = ({ className, activeIndex }) => {
    const [{ left, width, height }, setDimensions] = useState({ left: 0, width: 0, height: 0 });

    /* используем рефы на табы, хранящиеся в контексте табов */
    const { refs } = useTabsContext();

    useEffect(() => {
        if (refs) {
            const activeTab = refs.items[activeIndex].current;
            if (activeTab) {
                const style = getComputedStyle(activeTab);
                setDimensions({
                    width: activeTab.offsetWidth,
                    left: activeTab.offsetLeft - parseInt(style.marginLeft, 10),
                    height: activeTab.offsetHeight,
                });
            }
        }
    }, [activeIndex]);

    return <StyledSlider className={className} style={{ left, width, height }} />;
};
