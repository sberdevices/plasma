import { createContext } from 'react';

import { AssistantAppState, AssistantInstance } from '../../types';

export interface AssistantContextType {
    assistant: AssistantInstance | null;
    setAssistantState: <T extends AssistantAppState>(state: T) => void;
}

export const AssistantContext = createContext<AssistantContextType>({
    assistant: null,
    setAssistantState: () => {
        throw new Error('Assistant context is not provided');
    },
});
