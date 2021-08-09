import type { TypographyTypes } from '../Typography';

export interface TextSizeProps {
    /**
     * Размер текста, соответствующий типографике
     */
    size: TypographyTypes;
}

export const DEFAULT_TEXT_SIZE = 'body1';
export const DEFAULT_ROUNDNESS = 16;
