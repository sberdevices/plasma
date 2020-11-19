import React from 'react';

import { Bluetooth } from '../Icon.assets/Bluetooth';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBluetooth: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Bluetooth} />;
};
