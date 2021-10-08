import React from 'react';
import styled from 'styled-components';
import Draggable, { DraggableData } from 'react-draggable';
import { surfaceLiquid03, white } from '@sberdevices/plasma-core';

import { handleDiameter, handleBorderWidth } from './SliderBase';

interface HandleProps {
    stepSize: number;
    min: number;
    max: number;
    bounds?: number[];
    xPosition?: number;
    zIndex?: number;
    disabled?: boolean;
    onChangeCommitted(value: number, data: DraggableData): void;
    onChange?(value: number, data: DraggableData): void;
}

const HandleStyled = styled.div`
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
`;

const HandleStyledInner = styled.div`
    border-radius: 50%;
    background-color: ${white};
    width: ${handleDiameter}rem;
    height: ${handleDiameter}rem;
    border: ${handleBorderWidth}rem solid ${surfaceLiquid03};
    background-clip: content-box;

    transition: transform 0.1s ease-in-out;

    &:hover {
        transform: scale(1.08);
    }

    &:active {
        transform: scale(0.92);
    }
`;

function getValue(handleCenterXRelative: number, stepSize: number, min: number, max: number) {
    const newValue = Math.round(handleCenterXRelative / stepSize) + min;

    return Math.min(Math.max(newValue, min), max);
}

export const Handle = React.forwardRef<HTMLDivElement, HandleProps>(
    ({ stepSize, onChangeCommitted, onChange, xPosition, min, max, bounds = [], zIndex, disabled }, ref) => {
        const lastOnChangeValue = React.useRef<number | null>(null);

        const onDrag = React.useCallback(
            (_, data) => {
                const newHandleXPosition = data.lastX;

                if (onChange) {
                    const newValue = getValue(newHandleXPosition, stepSize, min, max);
                    if (lastOnChangeValue.current !== newValue) {
                        onChange(newValue, data);
                        lastOnChangeValue.current = newValue;
                    }
                }
            },
            [onChange, stepSize, min, max],
        );

        const onStop = React.useCallback(
            (_, data) => {
                const newHandleXPosition = data.lastX;
                const newValue = getValue(newHandleXPosition, stepSize, min, max);
                onChangeCommitted(newValue, data);
            },
            [onChangeCommitted, stepSize, min, max],
        );

        const [leftValueBound, rightValueBound] = bounds;
        const leftPositionBound = leftValueBound ? (leftValueBound - min) * stepSize : null;
        const rightPositionBound = rightValueBound ? (rightValueBound - min) * stepSize : null;

        return (
            <Draggable
                axis="x"
                bounds={{ left: leftPositionBound ?? 0, right: rightPositionBound ?? stepSize * (max - min) }}
                grid={[stepSize, 1]}
                onStop={onStop}
                onDrag={onDrag}
                position={typeof xPosition === 'number' ? { x: xPosition, y: 0 } : undefined}
                disabled={disabled}
            >
                <HandleStyled ref={ref} style={{ zIndex }}>
                    <HandleStyledInner />
                </HandleStyled>
            </Draggable>
        );
    },
);
