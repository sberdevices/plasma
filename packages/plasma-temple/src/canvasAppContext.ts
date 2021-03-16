import { createContext } from 'react';
import { AssistantInstance, Route } from './types';

interface CanvasAppContext {
    assistant: AssistantInstance | null;
    configRoute?: Route;
}

export const CanvasAppContext = createContext<CanvasAppContext>({
    assistant: null,
});
