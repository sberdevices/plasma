import React from 'react';

import { Device } from '../Icon.assets/Device';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDevice: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Device} />;
};
