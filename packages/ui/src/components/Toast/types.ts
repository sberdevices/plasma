export type Position = 'top' | 'bottom';

export type ToastInfo = {
    text: string | null;
    position: Position | null;
    timeout: number | null;
    fade?: boolean;
};
