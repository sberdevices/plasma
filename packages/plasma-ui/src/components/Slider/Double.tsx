import React from 'react';

import { SliderBase } from './SliderBase';
import { Handle } from './Handle';

export interface SliderProps {
    /**
     * Минимальное значение
     */
    min: number;
    /**
     * Максимальное значение
     */
    max: number;
    /**
     * Текущее значение
     */
    value: number[];
    /**
     * Компонент неактивен
     */
    disabled?: boolean;
    /**
     * Вызывается при отпускании ползунка
     */
    onChangeCommitted(value: number[]): void;
    /**
     * Вызывается при перемещении ползунка
     */
    onChange?(value: number[]): void;
}

function getXCenterHandle(handle: HTMLDivElement) {
    const containerX = handle.parentElement?.getBoundingClientRect()?.x || 0;
    const handleRect = handle.getBoundingClientRect();
    const handlePosition = handleRect.x;
    return handlePosition - containerX;
}

export const Slider: React.FC<SliderProps> = ({ min, max, value, disabled, onChangeCommitted, onChange }) => {
    const [state, setState] = React.useState({
        stepSize: 0,
        railFillWidth: 0,
        railFillXPosition: 0,
        xFirstHandle: 0,
        xSecondHandle: 0,
        firstHandleZIndex: 100,
        secondHandleZIndex: 101,
        firstValue: value[0],
        secondValue: value[1],
    });

    const firstHandleRef = React.useRef<HTMLDivElement | null>(null);
    const secondHandleRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const firstLocalValue = Math.min(Math.max(value[0], min), max) - min;
        const secondLocalValue = Math.min(Math.max(value[1], min), max) - min;
        setState((prevState) => ({
            ...prevState,
            railFillXPosition: state.stepSize * firstLocalValue,
            railFillWidth: state.stepSize * secondLocalValue - state.stepSize * firstLocalValue,
            xFirstHandle: state.stepSize * firstLocalValue,
            xSecondHandle: state.stepSize * secondLocalValue,
        }));
    }, [value, state.stepSize, min]);

    const setStepSize = React.useCallback((newStepSize) => {
        setState((prevState) => ({
            ...prevState,
            stepSize: newStepSize,
        }));
    }, []);

    const onFirstHandleChange = React.useCallback(
        (handleValue, data) => {
            if (secondHandleRef?.current) {
                const newHandleXPosition = data.x;
                const secondHandleXPosition = getXCenterHandle(secondHandleRef.current);
                const fillWidth = secondHandleXPosition - newHandleXPosition;

                setState((prevState) => ({
                    ...prevState,
                    firstHandleZIndex: 101,
                    secondHandleZIndex: 100,
                    railFillWidth: fillWidth < 0 ? 0 : fillWidth,
                    railFillXPosition: newHandleXPosition,
                }));
                if (onChange) {
                    onChange([handleValue, value[1]]);
                }
            }
        },
        [onChange, value],
    );

    const onFirstHandleChangeCommited = React.useCallback(
        (handleValue, data) => {
            onChangeCommitted([handleValue, value[1]]);

            setState((prevState) => ({
                ...prevState,
                firstValue: handleValue,
                xFirstHandle: data.lastX,
            }));
        },
        [onChangeCommitted, value],
    );

    const onSecondHandleChange = React.useCallback(
        (handleValue, data) => {
            if (firstHandleRef?.current) {
                const firstXHandleXPosition = getXCenterHandle(firstHandleRef.current);

                const newHandleXPosition = data.x;
                const fillWidth = newHandleXPosition - firstXHandleXPosition;

                setState((prevState) => ({
                    ...prevState,
                    firstHandleZIndex: 100,
                    secondHandleZIndex: 101,
                    railFillWidth: fillWidth < 0 ? 0 : fillWidth,
                    railFillXPosition: firstXHandleXPosition,
                }));
                if (onChange) {
                    onChange([value[0], handleValue]);
                }
            }
        },
        [onChange, value],
    );

    const onSecondHandleChangeCommited = React.useCallback(
        (handleValue, data) => {
            onChangeCommitted([value[0], handleValue]);
            setState((prevState) => ({
                ...prevState,
                secondValue: handleValue,
                xSecondHandle: data.lastX,
            }));
        },
        [onChangeCommitted, value],
    );

    return (
        <SliderBase
            min={min}
            max={max}
            disabled={disabled}
            setStepSize={setStepSize}
            railFillWidth={state.railFillWidth}
            railFillXPosition={state.railFillXPosition}
        >
            <Handle
                ref={firstHandleRef}
                stepSize={state.stepSize}
                onChangeCommitted={onFirstHandleChangeCommited}
                onChange={onFirstHandleChange}
                min={min}
                max={max}
                disabled={disabled}
                bounds={[min, state.secondValue]}
                side="left"
                xPosition={state.xFirstHandle}
                zIndex={state.firstHandleZIndex}
            />
            <Handle
                ref={secondHandleRef}
                stepSize={state.stepSize}
                onChangeCommitted={onSecondHandleChangeCommited}
                onChange={onSecondHandleChange}
                min={min}
                max={max}
                disabled={disabled}
                bounds={[state.firstValue, max]}
                side="right"
                xPosition={state.xSecondHandle}
                zIndex={state.secondHandleZIndex}
            />
        </SliderBase>
    );
};
