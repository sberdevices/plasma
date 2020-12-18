import React from 'react';

import { WifiSignalLock } from '../Icon.assets/WifiSignalLock';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiSignalLock: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiSignalLock} />;
};
