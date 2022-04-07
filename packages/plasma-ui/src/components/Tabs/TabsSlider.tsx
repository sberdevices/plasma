import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { surfaceCard } from '@sberdevices/plasma-core';

import { useTabsAnimationContext } from './TabsAnimationContext';

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
    index?: number;
    disabled?: boolean;
}

export const activeItemStyle = css`
    background-color: ${surfaceCard};
    /* stylelint-disable-next-line number-max-precision */
    box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05);
`;

export const StyledSlider = styled.div<Pick<SliderProps, 'disabled'>>`
    position: absolute;
    z-index: -1;

    min-width: 0%;
    border-radius: var(--tab-item-border-radius);

    transition: ${({ disabled, theme }) =>
        disabled || theme.disableAnimation ? 'unset' : 'left 0.2s ease-in-out, width 0.2s ease-in-out'};
    ${activeItemStyle};

    pointer-events: none;
`;

/**
 * Слайдер переключения табов
 */
export const TabsSlider: React.FC<SliderProps> = ({ index, ...rest }) => {
    const [dimensions, setDimensions] = useState({ left: 0, width: 0, height: 0 });
    const { refs } = useTabsAnimationContext();

    useEffect(() => {
        if (!refs || index === undefined) {
            return;
        }

        const activeTab = refs.items[index].current;

        if (!activeTab) {
            return;
        }

        const resizeObserver = new window.ResizeObserver(() => {
            const style = getComputedStyle(activeTab);

            setDimensions({
                width: activeTab.offsetWidth,
                left: activeTab.offsetLeft - parseInt(style.marginLeft, 10),
                height: activeTab.offsetHeight,
            });
        });

        resizeObserver.observe(activeTab, { box: 'border-box' });

        return () => {
            resizeObserver.unobserve(activeTab);
        };
    }, [index]);

    return <StyledSlider style={dimensions} {...rest} />;
};
