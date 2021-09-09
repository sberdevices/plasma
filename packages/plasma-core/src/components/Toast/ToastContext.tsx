import { createContext } from 'react';

import { ToastInfo, ShowToast } from './types';

type ContextType = ToastInfo & {
    showToast: ShowToast;
    hideToast: () => void;
};

export const ToastContext = createContext<ContextType>({
    content: null,
    position: null,
    timeout: null,
    showToast: (() => {
        const show = () => undefined;
        show.success = () => undefined;
        show.error = () => undefined;
        show.pending = () => undefined;
        return show;
    })(),
    hideToast: () => undefined,
});
