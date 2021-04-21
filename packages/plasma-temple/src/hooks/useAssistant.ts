import React from 'react';

import { AssistantContext, AssistantContextType } from '../components/PlasmaApp/AssistantContext';
import { AssistantInstance } from '../types';

export const useAssistant = (): {
    assistant: AssistantInstance;
    setAssistantState: AssistantContextType['setAssistantState'];
} => {
    const { getAssistant, setAssistantState } = React.useContext(AssistantContext);

    return React.useMemo(
        () => ({
            assistant: getAssistant(),
            setAssistantState,
        }),
        [getAssistant, setAssistantState],
    );
};
