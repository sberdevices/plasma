import React from 'react';

import { Picture } from '../Icon.assets/Picture';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPicture: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Picture} />;
};
