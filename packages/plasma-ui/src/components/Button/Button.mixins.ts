import { getButtonSizesMixin, buttonSizes, buttonTypography, buttonViews } from '@sberdevices/plasma-core';
import type { ButtonViewProps } from '@sberdevices/plasma-core';

/**
 * @private
 */
export const applySizes = getButtonSizesMixin(buttonSizes, buttonTypography);

/**
 * @private
 */
export const applyViews = ({ view }: ButtonViewProps) => buttonViews[view];
