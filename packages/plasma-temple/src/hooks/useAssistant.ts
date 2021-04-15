import React from 'react';

import { AssistantContext, AssistantContextType } from '../components/PlasmaApp/AssistantContext';

export const useAssistant = (): AssistantContextType => {
    return React.useContext(AssistantContext);
};
