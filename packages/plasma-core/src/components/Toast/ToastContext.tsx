import { createContext, ReactNode } from 'react';

import { ToastInfo, Position } from './types';

type ContextType = ToastInfo & {
    showToast: (content: ReactNode, position?: Position, timeout?: number, fade?: boolean) => void;
    hideToast: () => void;
};

export const ToastContext = createContext<ContextType>({
    content: null,
    position: null,
    timeout: null,
    showToast: () => undefined,
    hideToast: () => undefined,
});
