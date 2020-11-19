import React from 'react';

import { Ethernet } from '../Icon.assets/Ethernet';
import { IconRoot, IconProps } from '../IconRoot';

export const IconEthernet: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Ethernet} />;
};
