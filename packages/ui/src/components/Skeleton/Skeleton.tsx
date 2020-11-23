import { typography } from '@sberdevices/plasma-tokens';

export type TextSize = keyof typeof typography;
export interface TextSizeProps {
    /**
     * Размер текста, соответствующий типографике
     */
    size: TextSize;
}

export const DEFAULT_TEXT_SIZE = 'body1';
export const DEFAULT_ROUNDNESS = 16;

export interface SkeletonProps {
    /**
     * Применить скелетон
     */
    skeleton?: boolean;
}
