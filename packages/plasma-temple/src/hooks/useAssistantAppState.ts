import React from 'react';

import { AssistantAppState } from '../types';

import { useAssistant } from './useAssistant';

export function useAssistantAppState(state: AssistantAppState): void {
    const { setAssistantState } = useAssistant();

    React.useEffect(() => {
        setAssistantState(state);
    }, [setAssistantState, state]);
}
