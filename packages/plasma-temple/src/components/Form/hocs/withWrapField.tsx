import React from 'react';

import { useFocusOnMount } from '../../../hooks/useFocusOnMount';
import {
    Field as FieldWrapper,
    FieldLabel,
    FieldControl,
    FieldErrorMessages,
    FieldAnnotation,
    FieldProps as FieldComponentProps,
} from '../components/Field';
import type { ValidityStateKeys, FieldPropsWithRef, FieldProps } from '../types';

/**
 * Хок для унификации работы с полями ввода и их валидации
 */
export function withWrapField<V, P extends React.PropsWithChildren<Record<string, unknown>> = Record<string, unknown>>(
    Component: React.ComponentType<FieldPropsWithRef<V, P> & P>,
    type: FieldComponentProps['type'] = 'text',
): React.FC<FieldProps<V> & P> {
    return ({ label, onSubmit, onChange, validationMessages, customValidate, description, value, ...props }) => {
        const [errors, setErrors] = React.useState<ValidityStateKeys[]>(() => []);

        const fieldRef = React.useRef<HTMLInputElement>(null);

        useFocusOnMount(fieldRef, {
            delay: 250,
        });

        const checkValidityField = React.useCallback(() => {
            if (fieldRef?.current != null) {
                const field = fieldRef.current;
                const result: ValidityStateKeys[] = [];

                if (!field.validity.valid) {
                    if (field.validity.valueMissing) {
                        setErrors(['valueMissing']);
                        return;
                    }

                    // eslint-disable-next-line guard-for-in
                    for (const key in field.validity) {
                        const currKey = key as ValidityStateKeys;
                        if (currKey !== 'valid' && field.validity[currKey]) {
                            result.push(currKey);
                        }
                    }
                }

                setErrors(result);
            }
        }, [fieldRef]);

        const onChangeHandler = React.useCallback(
            (val: V) => {
                if (fieldRef.current != null) {
                    const field = fieldRef.current;

                    field.setCustomValidity('');
                    setErrors([]);
                }

                onChange(val);
            },
            [fieldRef, onChange],
        );

        const validateInput: () => string | boolean = React.useCallback(() => {
            if (fieldRef.current != null) {
                const field = fieldRef.current;

                if (customValidate && !customValidate(value)) {
                    return validationMessages?.typeMismatch ?? '';
                }

                return field.validity.valid;
            }

            return true;
        }, [customValidate, validationMessages?.typeMismatch, value]);

        const onSubmitCallback = React.useCallback(() => {
            if (fieldRef.current != null) {
                const field = fieldRef.current;

                const res = validateInput();

                if (typeof res === 'string') {
                    field.setCustomValidity(res);
                }

                if (typeof res === 'boolean' && res) {
                    onSubmit();

                    return;
                }

                checkValidityField();
            } else {
                onSubmit();
            }
        }, [validateInput, checkValidityField, onSubmit]);

        const comp = React.useMemo(
            () => (
                <Component
                    {...((props as unknown) as FieldPropsWithRef<V, P> & P)}
                    label={label}
                    innerRef={fieldRef}
                    onSubmit={onSubmitCallback}
                    onChange={onChangeHandler}
                    validationMessages={validationMessages}
                    checkInput={checkValidityField}
                />
            ),
            [props, label, onSubmitCallback, onChangeHandler, validationMessages, checkValidityField],
        );

        const errorComp = React.useMemo(
            () =>
                validationMessages && errors ? (
                    <FieldErrorMessages errors={errors} messages={validationMessages} />
                ) : null,
            [validationMessages, errors],
        );

        return (
            <FieldWrapper type={type}>
                {label && type === 'select' ? <FieldLabel label={label} /> : null}
                <FieldControl>{comp}</FieldControl>
                {errorComp}
                {description ? <FieldAnnotation>{description}</FieldAnnotation> : null}
            </FieldWrapper>
        );
    };
}
