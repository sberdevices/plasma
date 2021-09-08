import React, { useState, useCallback } from 'react';

import { ToastInfo, Position } from './types';
import { ToastController } from './ToastController';
import { ToastContext } from './ToastContext';

const DEFAULT_POSITION = 'bottom';
const DEFAULT_TIMEOUT = 3000;
const DEFAULT_FADE = true;

export const ToastProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<ToastInfo>({ content: null, position: null, timeout: null });

    const showToast = useCallback((content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean) => {
        setValue({
            content,
            position: position || DEFAULT_POSITION,
            timeout: timeout !== undefined ? timeout : DEFAULT_TIMEOUT,
            fade: fade !== undefined ? fade : DEFAULT_FADE,
        });
    }, []);

    const hideToast = useCallback(() => {
        setValue({ content: null, position: null, timeout: null });
    }, []);

    return (
        <ToastContext.Provider value={{ ...value, showToast, hideToast }}>
            {children}
            <ToastController {...value} />
        </ToastContext.Provider>
    );
};
