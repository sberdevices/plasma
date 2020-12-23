import React, { createContext, useState, useCallback } from 'react';

import { ToastInfo, Position } from './types';
import { ToastController } from './ToastController';

type ContextType = ToastInfo & {
    showToast: (text: string, position?: Position, timeout?: number) => void;
    hideToast: () => void;
};

export const ToastContext = createContext<ContextType>({
    text: null,
    position: null,
    timeout: null,
    showToast: () => undefined,
    hideToast: () => undefined,
});

export const ToastProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<ToastInfo>({ text: null, position: null, timeout: null });

    const showToast = useCallback((text: string, position?: Position, timeout?: number) => {
        setValue({ text, position: position || 'bottom-center', timeout: timeout || null });
    }, []);

    const hideToast = useCallback(() => {
        setValue({ text: null, position: null, timeout: null });
    }, []);

    return (
        <ToastContext.Provider value={{ ...value, showToast, hideToast }}>
            {children}
            <ToastController {...value} />
        </ToastContext.Provider>
    );
};
