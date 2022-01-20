import React from 'react';

export type ValidityStateKeys = keyof ValidityState;
export type ValidityStateMessage = Record<ValidityStateKeys, string>;
export type ValidationMessage = Partial<ValidityStateMessage>;

export interface FormState {
    readonly [key: string]: unknown;
}
export interface FieldProps<V> {
    value?: V;
    onChange: (val?: V) => void;
    onSubmit: () => void;
    label?: string;
    validationMessages?: ValidationMessage;
    /**
     * Коллбек для валидации ввода в дополнение к браузерной валидации
     */
    customValidate?: (value?: V) => boolean;
    checkInput?: () => void;
    description?: string;
}

export interface DefaultFieldPropsWithRef<V> extends FieldProps<V> {
    innerRef?: React.RefObject<HTMLInputElement>;
}

export type FieldPropsWithRef<V, P = Record<string, unknown>> = DefaultFieldPropsWithRef<V> &
    P extends React.ComponentProps<infer C1>
    ? React.ComponentProps<C1>
    : never;

interface VoiceLabelsSuggest {
    suggestion: string;
    hint?: string;
}

interface VoiceLabelsConfirm {
    one: string;
    many?: string;
    description?: string;
    confirm?: string;
    reject?: string;
}

export interface VoiceLabels extends VoiceLabelsSuggest, VoiceLabelsConfirm {}

export interface FormContextApi<D> {
    data: D;
    onSubmit: () => void;
    onChange: <V>(val: V) => void;
    active: keyof D;
}

export type FieldComponentProps<S, K extends keyof S, P = Record<string, unknown>> = P & Omit<S, K>;
