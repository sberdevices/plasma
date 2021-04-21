import React from 'react';
import { action } from '@storybook/addon-actions';

import {
    AssistantSuggestWrapper,
    AssistantSuggestIcon,
    AssistantSuggestActionText,
    AssistantSuggestIntent,
    AssistantSuggestIntentHint,
    AssistantSuggestHint,
} from './AssistantSuggest';

export default {
    title: 'AssistantSuggest',
};

export const Default: React.FC = () => (
    <AssistantSuggestWrapper>
        <AssistantSuggestIcon size="s" />
        <AssistantSuggestActionText>Нажмите кнопку на пульте и скажите</AssistantSuggestActionText>
        <AssistantSuggestIntent>Билеты в Новосибирск на 13 ноября</AssistantSuggestIntent>
    </AssistantSuggestWrapper>
);

export const VoiceFill: React.FC = () => (
    <AssistantSuggestWrapper>
        <AssistantSuggestIcon size="m" />
        <AssistantSuggestActionText>Нажмите кнопку на пульте и скажите</AssistantSuggestActionText>
        <AssistantSuggestIntent>фамилию</AssistantSuggestIntent>
        <AssistantSuggestIntentHint>Скажите что-нибудь</AssistantSuggestIntentHint>
        <AssistantSuggestHint onOkClick={action('on ok click')} />
    </AssistantSuggestWrapper>
);
