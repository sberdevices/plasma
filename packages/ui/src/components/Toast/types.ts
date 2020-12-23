export type Position = 'top-center' | 'top-right' | 'top-left' | 'bottom-center' | 'bottom-right' | 'bottom-left';

export type ToastInfo = {
    text: string | null;
    position: Position | null;
    timeout: number | null;
};
