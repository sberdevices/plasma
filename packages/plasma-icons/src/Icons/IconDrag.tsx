import React from 'react';

import { Drag } from '../Icon.assets/Drag';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDrag: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Drag} />;
};
