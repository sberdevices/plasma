import React from 'react';
import { action } from '@storybook/addon-actions';

import { AssistantSuggest } from './AssistantSuggest';

export default {
    title: 'AssistantSuggest',
};

export const Default: React.FC = () => (
    <AssistantSuggest suggestion="Имя и фамилию" onManualFill={action('onManualFill')} />
);

export const VoiceFill: React.FC = () => (
    <AssistantSuggest suggestion="Имя и фамилию" onManualFill={action('onManualFill')} hint="Скажите что-нибудь" />
);
