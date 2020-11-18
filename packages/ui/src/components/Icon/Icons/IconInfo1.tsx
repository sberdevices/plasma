import React from 'react';

import { Info1 } from '../Icon.assets/Info1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconInfo1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Info1} />;
};
