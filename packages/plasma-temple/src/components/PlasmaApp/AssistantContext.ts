import { createContext } from 'react';
import { AssistantAppState, AssistantInstance } from '../../types';

export const AssistantContext = createContext<{
    assistant: AssistantInstance | null;
    setAssistantState: <T extends AssistantAppState>(state: T) => void;
}>({
    assistant: null,
    setAssistantState: () => {
        throw new Error('Assistant context is not provided');
    },
});
