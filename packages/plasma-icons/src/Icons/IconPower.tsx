import React from 'react';

import { Power } from '../Icon.assets/Power';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPower: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Power} />;
};
