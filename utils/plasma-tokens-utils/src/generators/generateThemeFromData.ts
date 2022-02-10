import { attachToRoot, objectToCSSVariables } from '../utils';
import type { DataObject } from '../types';

import { generateFile } from './generateFile';

/**
 * Сгененрировать файл темы из объекта с произвольной структурой.
 */
export const generateThemeFromData = (data: DataObject, fileName: string) =>
    generateFile(fileName, attachToRoot(objectToCSSVariables(data)));
