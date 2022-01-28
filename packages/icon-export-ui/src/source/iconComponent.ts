/**
 * Функция генерации файла `/Icons/Icon<Name>.tsx`. Здесь формируется компонент иконки.
 */
export default (name: string) => `import React from 'react';

import { ${name} } from '../Icon.assets/${name}';
import { IconRoot, IconProps } from '../IconRoot';

export const Icon${name}: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={${name}} />;
};`;
