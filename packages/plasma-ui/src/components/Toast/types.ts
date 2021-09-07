export type Position = 'top' | 'bottom';

export type ToastRole = 'alert' | 'log' | 'status';
export type ToastInfo = {
    text: string | null;
    position: Position | null;
    timeout: number | null;
    fade?: boolean;
    role?: ToastRole;
};
