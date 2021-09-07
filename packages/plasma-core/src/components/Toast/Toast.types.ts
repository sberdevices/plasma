import type { ReactNode } from 'react';

export type ToastPosition = 'top' | 'bottom';
export type ToastRole = 'alert' | 'log' | 'status';
export type ToastInfo = {
    text: string | null;
    contentLeft?: ReactNode;
    position: ToastPosition | null;
    timeout: number | null;
    fade?: boolean;
    role?: ToastRole;
};
