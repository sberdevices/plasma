import React from 'react';

import { WifiOff } from '../Icon.assets/WifiOff';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiOff: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiOff} />;
};
