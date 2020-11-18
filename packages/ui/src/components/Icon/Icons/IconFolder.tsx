import React from 'react';

import { Folder } from '../Icon.assets/Folder';
import { IconRoot, IconProps } from '../IconRoot';

export const IconFolder: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Folder} />;
};
