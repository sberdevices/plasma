import React from 'react';

import { AnyObject } from '../types';

type ErrorRecord<T> = Record<keyof T, string>;
type Validators<T extends AnyObject> = Partial<Record<keyof T, Validation>>;

interface FormOptions<T extends AnyObject> {
    validators?: Validators<T>;
    initialValues?: Partial<T>;
    onChange?: (value: T) => void;
    onSubmit?: () => void;
}

interface Validation {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: string) => boolean;
        message: string;
    };
}

interface FormState<T extends AnyObject = AnyObject> {
    data: T;
    errors: ErrorRecord<T> | null;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.SyntheticEvent) => void;
}

export const useForm = <T extends AnyObject = AnyObject>({
    validators,
    initialValues,
    onChange,
    onSubmit,
}: FormOptions<T>): FormState<T> => {
    const [data, setData] = React.useState<T>((initialValues ?? {}) as T);
    const [errors, setErrors] = React.useState<ErrorRecord<T> | null>(null);

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value, name } = event.target;
            const formValue = { ...data, [name]: value };

            setData(formValue);
            onChange?.(formValue);

            if (errors && errors[name as keyof T]) {
                setErrors({ ...errors, [name]: undefined });
            }
        },
        [data, errors, onChange],
    );

    const handleSubmit = React.useCallback(
        (event) => {
            event.preventDefault();

            if (validators) {
                let valid = true;
                const newErrors = {} as ErrorRecord<T>;

                (Object.keys(validators) as Array<keyof T>).forEach((key) => {
                    const value = data[key];
                    const validation = validators[key];

                    if (!value) {
                        if (validation?.required?.value) {
                            valid = false;
                            newErrors[key] = validation?.required?.message;
                            return;
                        }
                        return;
                    }

                    const pattern = validation?.pattern;
                    if (pattern?.value && !RegExp(pattern.value).test(String(value))) {
                        valid = false;
                        newErrors[key] = pattern.message;
                    }

                    const custom = validation?.custom;
                    if (custom?.isValid && !custom.isValid(String(value))) {
                        valid = false;
                        newErrors[key] = custom.message;
                    }
                });

                if (!valid) {
                    setErrors(newErrors);
                    return;
                }
            }

            setErrors(null);
            onSubmit?.();
        },
        [data, onSubmit, validators],
    );

    return {
        data,
        errors,
        handleChange,
        handleSubmit,
    };
};
