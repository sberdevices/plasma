import React, { useState, useCallback } from 'react';

import { ToastInfo, ToastPosition } from './Toast.types';
import { ToastController } from './ToastController';
import { ToastContext } from './ToastContext';

const DEFAULT_POSITION = 'bottom';
const DEFAULT_TIMEOUT = 3000;
const DEFAULT_FADE = true;

export const ToastProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<ToastInfo>({ text: null, position: null, timeout: null });

    const showToast = useCallback((text: string, position?: ToastPosition, timeout?: number, fade?: boolean) => {
        setValue({
            text,
            position: position || DEFAULT_POSITION,
            timeout: timeout !== undefined ? timeout : DEFAULT_TIMEOUT,
            fade: fade !== undefined ? fade : DEFAULT_FADE,
        });
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
