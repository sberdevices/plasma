import { ReactNode, createContext } from 'react';

import { ToastInfo, ToastPosition, ToastRole } from './Toast.types';

type ContextType = ToastInfo & {
    showToast: (
        text: string,
        position?: ToastPosition,
        timeout?: number,
        fade?: boolean,
        contentLeft?: ReactNode,
        role?: ToastRole,
    ) => void;
    hideToast: () => void;
};

export const ToastContext = createContext<ContextType>({
    text: null,
    position: null,
    timeout: null,
    showToast: () => undefined,
    hideToast: () => undefined,
});
