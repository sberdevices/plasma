import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { Body1, Headline2 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { GetStyledComponentProps } from '../../types';

import { AssistantSuggestIcon, AssistantSuggestProps, AssistantSuggestWrapper } from './AssistantSuggest@common';

type StyledComponentProps = GetStyledComponentProps<typeof Body1 | typeof Headline2>;
type StyledTextNode = StyledComponent<'div', any, StyledComponentProps, never>;

export const AssistantSuggestActionText: StyledTextNode = styled(Body1)`
    z-index: 1;
    margin-top: 0.45rem;
`;

export const AssistantSuggestIntent: StyledTextNode = styled(Headline2)`
    position: relative;
    margin-top: 0.375rem;
    background: linear-gradient(93.97deg, #2fd65c 6.49%, #20c1c7 93.51%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
`;

export const AssistantSuggestIntentHint: StyledTextNode = styled(Body1)`
    position: relative;

    margin-top: 0.5px;
    color: ${secondary};
`;

export const AssistantSuggestHintText: StyledTextNode = styled(Body1)`
    position: relative;

    margin-top: 4rem;
    color: ${secondary};

    & + ${AssistantSuggestIntentHint} {
        margin-top: 2.875rem;
    }
`;

export const AssistantSuggestSberPortal: React.FC<AssistantSuggestProps> = ({ suggestion, hint }) => {
    return (
        <AssistantSuggestWrapper>
            <AssistantSuggestIcon />
            <AssistantSuggestActionText>Назовите</AssistantSuggestActionText>
            <AssistantSuggestIntent>{suggestion}</AssistantSuggestIntent>
            {hint ? <AssistantSuggestIntentHint>{hint}</AssistantSuggestIntentHint> : null}
        </AssistantSuggestWrapper>
    );
};
