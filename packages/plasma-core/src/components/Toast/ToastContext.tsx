import { createContext } from 'react';

import { ToastInfo, Position } from './types';

type ContextType = ToastInfo & {
    showToast: (text: string, position?: Position, timeout?: number, fade?: boolean) => void;
    hideToast: () => void;
};

export const ToastContext = createContext<ContextType>({
    text: null,
    position: null,
    timeout: null,
    showToast: () => undefined,
    hideToast: () => undefined,
});
