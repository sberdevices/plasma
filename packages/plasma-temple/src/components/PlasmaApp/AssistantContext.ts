import { createContext } from 'react';

import { AssistantAppState, AssistantInstance } from '../../types';

export interface AssistantContextType {
    getAssistant: () => AssistantInstance;
    setAssistantState: <T extends AssistantAppState>(state: T) => void;
}

const throwFn = () => {
    throw new Error('Assistant context is not provided');
};

export const AssistantContext = createContext<AssistantContextType>({
    getAssistant: throwFn,
    setAssistantState: throwFn,
});
