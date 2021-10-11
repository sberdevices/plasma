import type { ReactNode } from 'react';

export type ToastPosition = 'top' | 'bottom';

export type ToastInfo = {
    text: string | null;
    contentLeft?: ReactNode;
    position: ToastPosition | null;
    timeout: number | null;
    fade?: boolean;
};
