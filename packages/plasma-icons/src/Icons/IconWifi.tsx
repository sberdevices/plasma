import React from 'react';

import { Wifi } from '../Icon.assets/Wifi';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWifi: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Wifi} />;
};
