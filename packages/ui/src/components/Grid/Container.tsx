import React from 'react';
import styled, { css } from 'styled-components';
import { scalingPixelBasis, sberBoxScale } from '@sberdevices/plasma-tokens';

import { mediaQuery, gridSizes, gridColumns, gridMargins, gridGutters } from '../../utils';
import { DeviceDetectionContext } from '../Device';

interface StyledContainerProps {
    $width: number;
    $deviceScale?: number;
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

    ${({ $width, $deviceScale = sberBoxScale }) =>
        gridSizes.map((breakpoint) => {
            const containerWidth = $width;
            const margins =
                (gridMargins[breakpoint] * sidesCount - gridGutters[breakpoint]) * scalingPixelBasis * $deviceScale;

            return mediaQuery(
                breakpoint,
                $deviceScale,
            )(css`
                --plasma-grid-margin: ${gridMargins[breakpoint]}rem;
                --plasma-grid-gutter: ${gridGutters[breakpoint] / sidesCount}rem;
                --plasma-grid-column-width: ${(containerWidth - margins) / gridColumns[breakpoint]}px;
            `);
        })}
`;

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = React.useState(0);
    const { deviceScale } = React.useContext(DeviceDetectionContext);

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
        <StyledContainer ref={ref} $width={width} $deviceScale={deviceScale} {...props}>
            {children}
        </StyledContainer>
    );
};
