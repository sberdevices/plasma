export type ToastPosition = 'top' | 'bottom';

export type ToastInfo = {
    text: string | null;
    position: ToastPosition | null;
    timeout: number | null;
    fade?: boolean;
};
