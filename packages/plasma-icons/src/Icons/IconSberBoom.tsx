import React from 'react';

import { SberBoom } from '../Icon.assets/SberBoom';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberBoom: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberBoom} />;
};
