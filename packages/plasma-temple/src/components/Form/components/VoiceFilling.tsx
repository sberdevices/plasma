import React from 'react';

import {
    AssistantActionConfirmWrapper,
    AssistantActionConfirmLabel,
    AssistantActionConfirmResult,
    AssistantActionConfirmDescription,
    AssistantActionConfirmControls,
    AssistantActionConfirmResults,
    AssistantActionConfirmTitle,
} from '../../AssistantActionConfirm/AssistantActionConfirm';
import {
    AssistantSuggestWrapper,
    AssistantSuggestIcon,
    AssistantSuggestActionText,
    AssistantSuggestIntent,
    AssistantSuggestIntentHint,
    AssistantSuggestHint,
} from '../../AssistantSuggest/AssistantSuggest';
import { VoiceLabels } from '../types';

interface VoiceFillingProps<T> {
    manual: boolean;
    label: VoiceLabels;
    canRejected?: boolean;
    formatter?: (val: T) => string;
    onChange: (val: T) => void;
    onReject?: () => void;
    onManualFill: () => void;
    suggestions?: Array<T>;
    confirmDisable?: boolean;
}

export function VoiceFilling<T>({
    manual,
    label,
    onChange,
    onReject,
    onManualFill,
    suggestions = [],
    children,
    formatter,
    confirmDisable,
}: React.PropsWithChildren<VoiceFillingProps<T>>): React.ReactElement {
    if (manual && children) {
        return <>{children}</>;
    }

    if (suggestions.length === 1) {
        return (
            <AssistantActionConfirmWrapper>
                <AssistantActionConfirmLabel>{label.one}</AssistantActionConfirmLabel>
                <AssistantActionConfirmResult>
                    {formatter?.(suggestions[0]) ?? suggestions[0]}
                </AssistantActionConfirmResult>
                {label.description ? (
                    <AssistantActionConfirmDescription>{label.description}</AssistantActionConfirmDescription>
                ) : null}
                <AssistantActionConfirmControls
                    onConfirm={onChange}
                    onReject={onReject}
                    suggests={suggestions}
                    confirmDisable={confirmDisable}
                />
            </AssistantActionConfirmWrapper>
        );
    }

    if (suggestions.length > 1) {
        return (
            <AssistantActionConfirmWrapper>
                <AssistantActionConfirmTitle>{label.many}</AssistantActionConfirmTitle>
                {label.description ? (
                    <AssistantActionConfirmDescription>{label.description}</AssistantActionConfirmDescription>
                ) : null}
                <AssistantActionConfirmResults
                    onConfirm={onChange}
                    onReject={onReject}
                    suggests={suggestions}
                    labelFormatter={formatter}
                />
            </AssistantActionConfirmWrapper>
        );
    }

    return (
        <AssistantSuggestWrapper>
            <AssistantSuggestIcon size="m" />
            <AssistantSuggestActionText>Нажмите кнопку на пульте и скажите</AssistantSuggestActionText>
            <AssistantSuggestIntent>{label.suggestion}</AssistantSuggestIntent>
            {label.hint ? <AssistantSuggestIntentHint>{label.hint}</AssistantSuggestIntentHint> : null}
            {children == null ? null : <AssistantSuggestHint onOkClick={onManualFill} />}
        </AssistantSuggestWrapper>
    );
}
