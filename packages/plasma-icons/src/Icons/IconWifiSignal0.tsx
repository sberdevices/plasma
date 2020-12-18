import React from 'react';

import { WifiSignal0 } from '../Icon.assets/WifiSignal0';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiSignal0: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiSignal0} />;
};
