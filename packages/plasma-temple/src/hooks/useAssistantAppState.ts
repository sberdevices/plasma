import { useEffect } from 'react';
import { useAssistant } from './useAssistant';
import { AssistantAppState } from '../types';

export function useAssistantAppState(state: AssistantAppState) {
    const { setAssistantState } = useAssistant();

    useEffect(() => {
        setAssistantState(state);
    }, [setAssistantState, state]);
}
