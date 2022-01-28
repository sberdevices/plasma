import { capitalizeFirstLetter, insert } from '../utils';

const EXPORT_ICON_SET_OBJECT_LINE = 'export const iconSectionsSet';

const getStartIndex = (source: string, category: string) => source.search(`${category}: {`);

const getEndIndex = (source: string, index: number) => source.substring(index).search('\n    }');

const addToIconSectionsSet = (source: string, index: number, iconName: string) =>
    insert(source, index, ` \n        ${capitalizeFirstLetter(iconName)}: ${iconName},`);

const getIconImport = (iconName: string) => `\nimport { ${iconName} } from './Icon.assets/${iconName}';\n`;

export default (source: string, category: string, iconName: string) => {
    const index = source.search(EXPORT_ICON_SET_OBJECT_LINE) - 1;
    const newSource = insert(source, index, getIconImport(iconName));

    const startIndex = getStartIndex(newSource, category);
    const endIndex = getEndIndex(newSource, startIndex);
    return addToIconSectionsSet(newSource, startIndex + endIndex, iconName);
};
