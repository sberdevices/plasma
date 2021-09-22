import { createContext } from 'react';

import { ToastInfo, ToastPosition } from './Toast.types';

type ContextType = ToastInfo & {
    showToast: (text: string, position?: ToastPosition, timeout?: number, fade?: boolean) => void;
    hideToast: () => void;
};

export const ToastContext = createContext<ContextType>({
    text: null,
    position: null,
    timeout: null,
    showToast: () => undefined,
    hideToast: () => undefined,
});
