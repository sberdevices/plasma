import React from 'react';

import { Devices } from '../Icon.assets/Devices';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDevices: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Devices} />;
};
