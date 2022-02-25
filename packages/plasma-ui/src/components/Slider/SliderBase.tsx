import React from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { surfaceLiquid03, buttonAccent, scalingPixelBasis, sberPortalScale } from '@sberdevices/plasma-tokens';

import { ThemeProviderValue } from '../Device/DeviceDetection';

export const handleDiameter = 1.5;
export const handleBorderWidth = 0.0625;
export const railHeight = 0.25;
export const railBorderRadius = railHeight / 2;
export const indentation = handleDiameter / 2 + handleBorderWidth;

interface SliderProps {
    min: number;
    max: number;
    railFillWidth: number;
    railFillXPosition?: number;
    disabled?: boolean;
    setStepSize(stepSize: number): void;
}

const Slider = styled.div<{ disabled?: boolean }>`
    position: relative;
    height: 1.625rem;
    user-select: none;
    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
        `}
`;

const Rail = styled.div`
    position: relative;
    height: ${railHeight}rem;
    border-radius: ${railBorderRadius}rem;
    background-color: ${surfaceLiquid03};
    overflow: hidden;
    top: 50%;
    margin-left: ${indentation}rem;
    margin-right: ${indentation}rem;
    transform: translateY(-50%);
`;

const Fill = styled.div`
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${buttonAccent};
    width: 0;
`;

export const SliderBase: React.FC<SliderProps> = ({
    max,
    min,
    setStepSize,
    railFillWidth,
    children,
    railFillXPosition = 0,
    disabled,
}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const theme = React.useContext<ThemeProviderValue>(ThemeContext);

    React.useLayoutEffect(() => {
        const resizeHandler = () => {
            if (ref.current) {
                const rootElementFontSize = (theme?.deviceScale ?? sberPortalScale) * scalingPixelBasis;
                const railSize = ref.current.offsetWidth - indentation * rootElementFontSize * 2;
                const totalSteps = max - min;
                setStepSize(railSize / totalSteps);
            }
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, [min, max, setStepSize]);

    return (
        <Slider disabled={disabled} ref={ref}>
            <Rail>
                <Fill style={{ left: `${railFillXPosition}px`, width: `${railFillWidth}px` }} />
            </Rail>
            {children}
        </Slider>
    );
};
