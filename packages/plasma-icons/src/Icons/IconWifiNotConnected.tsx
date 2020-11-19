import React from 'react';

import { WifiNotConnected } from '../Icon.assets/WifiNotConnected';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiNotConnected: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiNotConnected} />;
};
