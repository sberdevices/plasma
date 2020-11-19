import React from 'react';

import { Trash } from '../Icon.assets/Trash';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTrash: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Trash} />;
};
