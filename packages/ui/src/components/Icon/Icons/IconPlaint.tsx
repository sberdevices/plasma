import React from 'react';

import { Plaint } from '../Icon.assets/Plaint';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlaint: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Plaint} />;
};
