import { HTML_FONT_SIZE, ROBO_COMMENT } from '../constants';
import type { DataObject, GeneratedFiles } from '../types';
import { attachToRoot, objectToCSSVariables } from '../utils';

import { generateFile } from './generateFile';

/**
 * Генерация типографики в по типам устройств для создания глобального стиля.
 * @param {Record<string, CSSRootTheme>} typoThemes Типографика, разложенная по типам устройств
 * @return {GeneratedFiles}
 */
export const generateTypoSystem = (
    typoThemes: Record<string, { theme: DataObject; scale?: number }>,
    mixin: DataObject = {},
) => {
    const files: GeneratedFiles = [];
    let indexContent = ROBO_COMMENT;

    for (const [fileName, { theme, scale = 1 }] of Object.entries(typoThemes)) {
        indexContent += `export { ${fileName} } from './${fileName}';\n`;

        files.push(
            generateFile(
                fileName,
                attachToRoot({
                    ...objectToCSSVariables(theme, 'typo'),
                    ...objectToCSSVariables(mixin),
                    fontSize: `${HTML_FONT_SIZE * scale}px`,
                }),
            ),
        );
    }

    files.push({
        file: 'index.ts',
        content: indexContent,
    });

    return files;
};
