import { insert } from '../utils';

const EXPORT_ICON_ROOT_LINE = "export { IconRoot } from './IconRoot';";

const getIconExport = (iconName: string) => `\nexport { Icon${iconName} } from './Icons/Icon${iconName}';\n`;

export default (source: string, iconName: string) => {
    const index = source.search(EXPORT_ICON_ROOT_LINE) - 1;

    return insert(source, index, getIconExport(iconName));
};
