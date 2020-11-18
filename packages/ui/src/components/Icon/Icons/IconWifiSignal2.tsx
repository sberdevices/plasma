import React from 'react';

import { WifiSignal2 } from '../Icon.assets/WifiSignal2';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiSignal2: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiSignal2} />;
};
