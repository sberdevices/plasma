import { useContext } from 'react';

import { ToastContext } from './ToastProvider';

export const useToast = () => {
    const { showToast, hideToast } = useContext(ToastContext);
    return { showToast, hideToast };
};
