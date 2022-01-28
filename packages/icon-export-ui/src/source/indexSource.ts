import { insertString } from '../utils';

const EXPORT_ICON_ROOT_LINE = "export { IconRoot } from './IconRoot';";

const getIconExport = (iconName: string) => `\nexport { Icon${iconName} } from './Icons/Icon${iconName}';\n`;

/**
 * Функция модификации файла `/index.ts`. Здесь вставляется сгенерированный экспорт иконки
 */
export default (source: string, iconName: string) => {
    const index = source.search(EXPORT_ICON_ROOT_LINE) - 1;

    return insertString(source, index, getIconExport(iconName));
};
