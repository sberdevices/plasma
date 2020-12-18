import React from 'react';

import { WifiSignal3 } from '../Icon.assets/WifiSignal3';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifiSignal3: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={WifiSignal3} />;
};
