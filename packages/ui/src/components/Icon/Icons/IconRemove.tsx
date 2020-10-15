import React from 'react';

import { Remove } from '../Icon.assets/Remove';
import { IconRoot, IconProps } from '../IconRoot';

export const IconRemove: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Remove} />;
};
