import React from 'react';

import { DevicesAlt1 } from '../Icon.assets/DevicesAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDevicesAlt1: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DevicesAlt1} />;
};
