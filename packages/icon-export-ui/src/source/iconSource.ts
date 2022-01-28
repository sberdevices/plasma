import { capitalizeFirstLetter, insertString } from '../utils';

const EXPORT_ICON_SET_OBJECT_LINE = 'export const iconSectionsSet';

const getStartIndexCategory = (source: string, category: string) => source.search(`${category}: {`);

const getEndIndexCategory = (source: string, index: number) => source.substring(index).search('\n    }');

const addToIconSectionsSet = (source: string, index: number, iconName: string) =>
    insertString(source, index, ` \n        ${capitalizeFirstLetter(iconName)}: ${iconName},`);

const getIconImport = (iconName: string) => `\nimport { ${iconName} } from './Icon.assets/${iconName}';\n`;

/**
 * Функция модификации файла `/icon.tsx`. Здесь вставляется сгенерированный импорт иконки,
 * и добавляется её компонент в выбранную категорию
 */
export default (source: string, category: string, iconName: string) => {
    const index = source.search(EXPORT_ICON_SET_OBJECT_LINE) - 1;
    const newSource = insertString(source, index, getIconImport(iconName));

    const startIndex = getStartIndexCategory(newSource, category);
    const endIndex = getEndIndexCategory(newSource, startIndex);
    return addToIconSectionsSet(newSource, startIndex + endIndex, iconName);
};
