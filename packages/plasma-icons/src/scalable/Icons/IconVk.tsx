import React from 'react';

import { Vk } from '../Icon.assets/Vk';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVk: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Vk} />;
};
