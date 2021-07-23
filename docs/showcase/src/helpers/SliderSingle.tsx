import React from 'react';
import styled from 'styled-components';
import { Slider } from '@sberdevices/plasma-ui/components/Slider';

export interface SliderShowcaseProps {
    min: number;
    max: number;
    defaultValue: number;
    disabled?: boolean;
    onChangeCommitted?(value: number): void;
    onChange?(value: number): void;
}

const SliderContainer = styled.div`
    width: 300px;
`;
export const SliderSingleShowcase: React.FC<SliderShowcaseProps> = ({
    min,
    max,
    defaultValue,
    disabled,
    onChange: onChangeAction,
    onChangeCommitted: onChangeCommittedAction,
}) => {
    const [state, setState] = React.useState({
        value: defaultValue,
    });
    const onChangeCommitted = React.useCallback(
        (newValue: number) => {
            setState((prevState) => ({
                ...prevState,
                value: newValue,
            }));
            onChangeCommittedAction && onChangeCommittedAction(newValue);
        },
        [onChangeCommittedAction],
    );
    const onChange = React.useCallback(
        (newValue: number) => {
            onChangeAction && onChangeAction(newValue);
        },
        [onChangeAction],
    );
    return (
        <SliderContainer>
            <Slider
                min={min}
                max={max}
                value={state.value}
                onChangeCommitted={onChangeCommitted}
                onChange={onChange}
                disabled={disabled}
            />
        </SliderContainer>
    );
};
