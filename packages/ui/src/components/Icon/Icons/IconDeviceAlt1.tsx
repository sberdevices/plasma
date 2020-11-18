import React from 'react';

import { DeviceAlt1 } from '../Icon.assets/DeviceAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDeviceAlt1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DeviceAlt1} />;
};
