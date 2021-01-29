import React from 'react';
import styled, { css } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { mediaQuery, gridSizes, gridColumns, gridMargins, gridGutters } from '../../utils';

interface StyledContainerProps {
    $width: number;
}

const sidesCount = 2;

const StyledContainer = styled.div<StyledContainerProps>`
    margin: 0 auto;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    width: 100%;
    padding-left: var(--plasma-grid-margin);
    padding-right: var(--plasma-grid-margin);

    ${({ $width, theme }) =>
        gridSizes.map((breakpoint) => {
            const containerWidth = $width;
            const margins =
                (gridMargins[breakpoint] * sidesCount - gridGutters[breakpoint]) *
                scalingPixelBasis *
                theme.deviceScale;

            return mediaQuery(
                breakpoint,
                theme.deviceScale,
            )(css`
                --plasma-grid-margin: ${gridMargins[breakpoint]}rem;
                --plasma-grid-gutter: ${gridGutters[breakpoint] / sidesCount}rem;
                --plasma-grid-column-width: ${(containerWidth - margins) / gridColumns[breakpoint]}px;
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

    React.useLayoutEffect(() => {
        const resizeHandler = () => {
            if (ref.current) {
                setWidth(ref.current?.offsetWidth);
            }
        };
        if (ref.current) {
            setWidth(ref.current?.offsetWidth);
        }
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return (
        <StyledContainer ref={ref} $width={width} {...props}>
            {children}
        </StyledContainer>
    );
};
