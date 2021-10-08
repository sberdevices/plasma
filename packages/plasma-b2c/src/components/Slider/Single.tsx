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
    value: number;
    /**
     * Компонент неактивен
     */
    disabled?: boolean;
    /**
     * Вызывается при перемещении ползунка
     */
    onChangeCommitted(value: number): void;
    /**
     * Вызывается при отпускании ползунка
     */
    onChange?(value: number): void;
}

export const Slider: React.FC<SliderProps> = ({ min, max, value, disabled, onChangeCommitted, onChange }) => {
    const [state, setState] = React.useState({
        xHandle: 0,
        stepSize: 0,
        railFillWidth: 0,
    });

    React.useEffect(() => {
        const localValue = Math.min(Math.max(value, min), max) - min;
        const { stepSize } = state;

        setState((prevState) => ({
            ...prevState,
            xHandle: stepSize * localValue,
            railFillWidth: stepSize * localValue,
        }));
    }, [value, state.stepSize, min]);

    const setStepSize = React.useCallback((newStepSize) => {
        setState((prevState) => ({
            ...prevState,
            stepSize: newStepSize,
        }));
    }, []);

    const onHandleChange = React.useCallback(
        (handleValue, data) => {
            const newHandleXPosition = data.x;

            setState((prevState) => ({
                ...prevState,
                railFillWidth: newHandleXPosition,
            }));

            if (onChange) {
                onChange(handleValue);
            }
        },
        [onChange],
    );

    const onHandleChangeCommited = React.useCallback(
        (handleValue, data) => {
            onChangeCommitted(handleValue);
            setState((prevState) => ({
                ...prevState,
                xHandle: data.lastX,
            }));
        },
        [onChangeCommitted],
    );

    return (
        <SliderBase
            min={min}
            max={max}
            disabled={disabled}
            setStepSize={setStepSize}
            railFillWidth={state.railFillWidth}
        >
            <Handle
                stepSize={state.stepSize}
                onChangeCommitted={onHandleChangeCommited}
                onChange={onHandleChange}
                xPosition={state.xHandle}
                min={min}
                max={max}
                disabled={disabled}
            />
        </SliderBase>
    );
};
