import { ReactNode } from 'react';

export type Position = 'top' | 'bottom';

export type ToastInfo = {
    content: ReactNode | null;
    position: Position | null;
    timeout: number | null;
    fade?: boolean;
};
