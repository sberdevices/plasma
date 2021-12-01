import React from 'react';
import styled, { css } from 'styled-components';
import {
    Container as BaseContainer,
    mediaQuery,
    gridSizes,
    gridColumns,
    gridMargins,
    gridGutters,
    canUseDOM,
    useIsomorphicLayoutEffect,
} from '@sberdevices/plasma-core';

interface StyledContainerProps {
    $width: number;
}

const sidesCount = 2;
const htmlFontSizePx = 16;

const StyledContainer = styled(BaseContainer)<StyledContainerProps>`
    ${({ $width, theme }) =>
        gridSizes.map((breakpoint) => {
            const containerWidth = $width;
            const margins =
                (gridMargins[breakpoint] * sidesCount - gridGutters[breakpoint]) * htmlFontSizePx * theme.deviceScale;

            return mediaQuery(
                breakpoint,
                theme.deviceScale,
            )(css`
                --plasma-grid-column-width: ${(containerWidth - margins) / gridColumns[breakpoint]}px;
                --plasma-grid-margin: ${gridMargins[breakpoint]}rem;
                --plasma-grid-gutter: ${gridGutters[breakpoint] / sidesCount}rem;
            `);
        })}
`;

/**
 * Блок с полями по бокам для размещения контента по вертикали.
 * Блок нельзя вкладывать сам в себя или дальше по дереву.
 */
export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = React.useState(0);

    const updateWidthFromRef = React.useCallback(() => {
        if (ref.current) {
            setWidth(ref.current?.offsetWidth);
        }
    }, []);

    useIsomorphicLayoutEffect(() => {
        const resizeHandler = () => {
            updateWidthFromRef();
        };
        updateWidthFromRef();
        let mutationObserver: MutationObserver;

        if (canUseDOM) {
            window.addEventListener('resize', resizeHandler);

            mutationObserver = new MutationObserver(updateWidthFromRef);
            if (ref.current) {
                mutationObserver.observe(ref.current, { childList: true });
            }
        }

        return () => {
            if (canUseDOM) {
                window.removeEventListener('resize', resizeHandler);
                mutationObserver && mutationObserver.disconnect();
            }
        };
    }, []);

    return (
        <StyledContainer ref={ref} $width={width} {...props}>
            {children}
        </StyledContainer>
    );
};
