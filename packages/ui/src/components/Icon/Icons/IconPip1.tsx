import React from 'react';

import { Pip1 } from '../Icon.assets/Pip1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPip1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Pip1} />;
};
