import { ReactNode } from 'react';

export type Position = 'top' | 'bottom';
export type Type = 'success' | 'error' | 'pending';

export type ToastInfo = {
    content: ReactNode | null;
    position: Position | null;
    timeout: number | null;
    fade?: boolean;
};

export type ShowToast = {
    (content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean): void;
    success(content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean): void;
    error(content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean): void;
    pending(content: React.ReactNode, position?: Position, timeout?: number, fade?: boolean): void;
};
