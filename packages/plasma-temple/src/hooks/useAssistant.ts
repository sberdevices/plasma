import { useContext } from 'react';
import { AssistantContext } from '../components/PlasmaApp/AssistantContext';

export const useAssistant = () => {
    return useContext(AssistantContext);
};
