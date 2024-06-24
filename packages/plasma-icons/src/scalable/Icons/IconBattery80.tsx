import React from 'react';

import { IconRoot, IconProps } from '../IconRoot';

export const IconBattery80: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} iconName="battery80" />;
};
