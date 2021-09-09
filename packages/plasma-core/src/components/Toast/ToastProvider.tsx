import React, { useState, useCallback, useMemo } from 'react';

import { ToastInfo, Position } from './types';
import { TypeIcons } from './consts';
import { ToastController } from './ToastController';
import { ToastContext } from './ToastContext';
import { ToastBody } from './ToastBody';

const DEFAULT_POSITION = 'bottom';
const DEFAULT_TIMEOUT = 3000;
const DEFAULT_FADE = true;

export const ToastProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<ToastInfo>({ content: null, position: null, timeout: null });

    const showToast = useMemo(
        () =>
            (() => {
                function show(content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean) {
                    setValue({
                        content,
                        position: position || DEFAULT_POSITION,
                        timeout: timeout !== undefined ? timeout : DEFAULT_TIMEOUT,
                        fade: fade !== undefined ? fade : DEFAULT_FADE,
                    });
                }

                show.success = (content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean) =>
                    show(<ToastBody left={TypeIcons.success}>{content}</ToastBody>, position, timeout, fade);
                show.error = (content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean) =>
                    show(<ToastBody left={TypeIcons.error}>{content}</ToastBody>, position, timeout, fade);
                show.pending = (content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean) =>
                    show(<ToastBody left={TypeIcons.pending}>{content}</ToastBody>, position, timeout, fade);

                return show;
            })(),
        [],
    );

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
