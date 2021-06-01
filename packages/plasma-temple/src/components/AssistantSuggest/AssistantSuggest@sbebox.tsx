import React from 'react';
import styled from 'styled-components';
import { Body1, Headline1, Footnote1 } from '@sberdevices/plasma-ui';
import { surfaceLiquid01, primary, secondary } from '@sberdevices/plasma-tokens';

import { useFocusOnMount } from '../../hooks/useFocusOnMount';

import { AssistantSuggestIcon, AssistantSuggestWrapper } from './AssistantSuggest@common';

const StyledOkButton = styled(Footnote1)`
    position: relative;
    display: inline-flex;
    height: 2.45rem;
    width: 2.45rem;
    justify-content: center;
    align-items: center;
    color: ${primary};
    margin-left: 0.375rem;
    outline: none;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        content: '';
        border-radius: 50%;

        opacity: 0.3;
        background: ${surfaceLiquid01};
        box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(42.5px);
        z-index: -1;
    }
`;

export const AssistantSuggestActionText = styled(Body1)`
    z-index: 1;
    margin-top: 0.5rem;
`;

export const AssistantSuggestIntent = styled(Headline1)`
    position: relative;
    margin-top: 0.375rem;
    background: linear-gradient(93.97deg, #2fd65c 6.49%, #20c1c7 93.51%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
`;

export const AssistantSuggestIntentHint = styled(Body1)`
    position: relative;

    margin-top: 0.5rem;
    color: ${secondary};
`;

export const AssistantSuggestHintText = styled(Body1)`
    position: relative;

    margin-top: 4rem;
    color: ${secondary};

    & + ${AssistantSuggestIntentHint} {
        margin-top: 2.875rem;
    }
`;

interface AssistantSuggestHintProps {
    onOkClick: () => void;
}

export const AssistantSuggestHint: React.FC<AssistantSuggestHintProps> = ({ onOkClick }) => {
    const mountRef = React.useRef<HTMLDivElement>(null);

    useFocusOnMount(mountRef, {
        delay: 250,
    });

    return (
        <AssistantSuggestHintText>
            Чтобы ввести с клавиатуры, нажмите на пульте кнопку
            <StyledOkButton ref={mountRef} tabIndex={0} onClick={onOkClick}>
                ОК
            </StyledOkButton>
        </AssistantSuggestHintText>
    );
};

export interface AssistantSuggestProps {
    onManualFill: () => void;
    suggestion?: string;
    hint?: string;
}

export const AssistantSuggestSberBox: React.FC<AssistantSuggestProps> = ({ suggestion, hint, onManualFill }) => {
    return (
        <AssistantSuggestWrapper>
            <AssistantSuggestIcon />
            <AssistantSuggestActionText>Нажмите кнопку на пульте и назовите</AssistantSuggestActionText>
            <AssistantSuggestIntent>{suggestion}</AssistantSuggestIntent>
            {hint ? <AssistantSuggestIntentHint>{hint}</AssistantSuggestIntentHint> : null}
            <AssistantSuggestHint onOkClick={onManualFill} />
        </AssistantSuggestWrapper>
    );
};
