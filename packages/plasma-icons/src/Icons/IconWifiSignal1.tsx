import React from 'react';

import { WifiSignal1 } from '../Icon.assets/WifiSignal1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiSignal1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiSignal1} />;
};
