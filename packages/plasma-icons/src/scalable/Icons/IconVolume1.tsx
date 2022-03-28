import React from 'react';

import { Volume1 } from '../Icon.assets/Volume1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVolume1: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Volume1} />;
};
