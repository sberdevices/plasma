import React from 'react';

import { Action as CommonAction } from '../../../store/types';
import { isNonNullableValue } from '../../../utils/isNonNullableValue';
import { useAssistantOnSmartAppData } from '../../../hooks';
import { VoiceLabels, FieldPropsWithRef } from '../types';

import { VoiceFilling } from './VoiceFilling';

enum StateActionType {
    setSuggests = 'set suggests',
    setManual = 'set munual input',
    setChangeFlag = 'set changed flag',
    setError = 'set error voice input',
}

type State<T> = {
    suggestions: Array<T>;
    manual: boolean;
    error: boolean;
    valueHasChange: boolean;
};

/**
 * Установка саджестов полученных от сценария
 */
type SetSuggestionsAction<T> = {
    type: StateActionType.setSuggests;
    payload?: Array<T>;
};

/**
 * Состояние ошибки для реакции на событие FILLING_ERROR
 */
type SetErrorVoiceInputAction<T> = {
    type: StateActionType.setError;
    payload: Array<T>;
};

/**
 * Установка ручного ввода
 */
type SetManualInput = {
    type: StateActionType.setManual;
};

type SetChangedFlag = {
    type: StateActionType.setChangeFlag;
};

type Action<T> = SetSuggestionsAction<T> | SetManualInput | SetErrorVoiceInputAction<T> | SetChangedFlag;

type AssistantVoiceFillAction<T> =
    | CommonAction<{ type: 'confirm' }>
    | CommonAction<{ type: 'skip' }>
    | CommonAction<{ type: 'reject' }>
    | CommonAction<{ type: 'fieldFill'; payload: { value: T[] } }>
    | CommonAction<{ type: 'fieldFillError'; payload: { value: T[] } }>;

function reducer<T>(state: State<T>, action: Action<T>) {
    switch (action.type) {
        case StateActionType.setSuggests:
            return {
                suggestions: action.payload || [],
                error: false,
                manual: false,
                valueHasChange: false,
            };
        case StateActionType.setManual:
            return {
                manual: true,
                suggestions: [],
                error: false,
                valueHasChange: false,
            };
        case StateActionType.setError:
            return {
                error: true,
                suggestions: action.payload,
                manual: false,
                valueHasChange: false,
            };
        case StateActionType.setChangeFlag: {
            return {
                ...state,
                valueHasChange: true,
            };
        }
        default:
            return state;
    }
}

export interface VoiceFieldProps<T> {
    labels: VoiceLabels;
    formatter?: (value: T) => string;
    onChange: (value: T) => void;
    onSubmit: () => void;
    value: T;
    component?: React.FC<FieldPropsWithRef<T>>;
    manualMode?: boolean;
}

export function VoiceField<T>({
    labels,
    formatter,
    onChange,
    onSubmit,
    value,
    component: Component,
    children,
    manualMode,
}: React.PropsWithChildren<VoiceFieldProps<T>>): React.ReactElement | null {
    const [{ suggestions, manual, error, valueHasChange }, dispatch] = React.useReducer<
        React.Reducer<State<T>, Action<T>>
    >(reducer, {
        suggestions: [],
        manual: false,
        error: false,
        valueHasChange: false,
    } as State<T>);

    const formatValue = React.useCallback(
        (val: T): string => {
            if (formatter) {
                return formatter(val);
            }

            if (typeof val === 'string') {
                return val;
            }

            return String(val);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [formatter],
    );

    React.useEffect(() => {
        if (manual || !valueHasChange) {
            return;
        }

        if (valueHasChange && isNonNullableValue(value, typeof value === 'object')) {
            onSubmit?.();
        }
    }, [manual, onSubmit, value, valueHasChange]);

    const handleVoiceInput = React.useCallback(
        (val: T) => {
            const selectedIndex = suggestions.findIndex((item) => {
                return item === val;
            });

            if (selectedIndex > -1) {
                onChange?.(suggestions[selectedIndex]);
                dispatch({
                    type: StateActionType.setChangeFlag,
                });
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [suggestions, onChange, dispatch],
    );

    const handleRejectInput = React.useCallback(() => {
        dispatch({
            type: StateActionType.setSuggests,
        });
    }, [dispatch]);

    const handlerManualFill = React.useCallback(() => {
        dispatch({
            type: StateActionType.setManual,
        });
    }, [dispatch]);

    const handleFilling = React.useCallback(
        (values: T[], type: Action<T>['type']) => {
            if (Array.isArray(values) && values.length > 0) {
                dispatch({
                    type,
                    payload: values,
                });
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch],
    );

    useAssistantOnSmartAppData<AssistantVoiceFillAction<T>>((action) => {
        if (!action) {
            return;
        }

        // TODO: затипизировать это
        switch (action.type) {
            case 'confirm':
                if (suggestions.length === 1) {
                    onChange?.(suggestions[0]);
                    dispatch({
                        type: StateActionType.setChangeFlag,
                    });
                }

                break;

            case 'skip':
                onSubmit?.();
                break;

            case 'reject':
                handleRejectInput();
                break;

            case 'fieldFill':
                handleFilling(action.payload.value, StateActionType.setSuggests);
                break;

            case 'fieldFillError':
                handleFilling(action.payload.value, StateActionType.setError);
                break;

            default:
                break;
        }
    });

    const componentToRender = React.useMemo(() => {
        if (!Component) {
            return null;
        }

        return (
            <Component
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                description={labels.description}
                label={labels.one}
            />
        );
    }, [Component, labels.description, labels.one, onChange, onSubmit, value]);

    return (
        <VoiceFilling
            manual={manualMode || manual}
            confirmDisable={error}
            onManualFill={handlerManualFill}
            onChange={handleVoiceInput}
            onReject={handleRejectInput}
            label={labels}
            suggestions={suggestions}
            formatter={formatValue}
        >
            {componentToRender}
            {children}
        </VoiceFilling>
    );
}
