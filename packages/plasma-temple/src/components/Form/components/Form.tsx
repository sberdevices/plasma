import React from 'react';
import styled from 'styled-components';

import { FormContextApi } from '../types';

const StyledRow = styled.div`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

interface FormProps<D, K extends keyof D> {
    sequence: Array<K>;
    initialData: D;
    children: (val: FormContextApi<D>) => React.ReactElement;
    initialField?: K;
    onSubmit?: (data: D) => void;
    onChangeValueField?: (val: D[K], field: K) => void;
}

export function Form<D, K extends keyof D = keyof D>(props: FormProps<D, K>): React.ReactElement {
    const { sequence, initialField, initialData, onSubmit, onChangeValueField } = props;
    const [formState, setFormState] = React.useState<D>(() => initialData);
    const [currentField, setCurrentField] = React.useState<K>(() => {
        if (initialField) {
            return initialField;
        }

        return sequence[0];
    });

    const onSubmitHandler = React.useCallback(() => {
        let next: K | undefined;
        const currentFieldIndex = sequence.indexOf(currentField);

        if (currentFieldIndex !== -1) {
            next = sequence[currentFieldIndex + 1];
        }

        onChangeValueField?.(formState[currentField], currentField);

        if (next) {
            setCurrentField(next);
        } else if (onSubmit) {
            onSubmit(formState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sequence, currentField, formState, onChangeValueField, onSubmit]);

    const onChangeHandler = React.useCallback(
        (value) => {
            setFormState((prevData) => {
                return {
                    ...prevData,
                    [currentField]: value,
                };
            });
        },
        [currentField],
    );

    const contextApi: FormContextApi<D> = React.useMemo(
        () => ({
            onSubmit: onSubmitHandler,
            onChange: onChangeHandler,
            data: formState,
            active: currentField,
        }),
        [formState, onChangeHandler, onSubmitHandler, currentField],
    );

    return <StyledRow>{props.children(contextApi)}</StyledRow>;
}
