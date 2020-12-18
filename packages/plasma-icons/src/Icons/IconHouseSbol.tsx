import React from 'react';

import { HouseSbol } from '../Icon.assets/HouseSbol';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHouseSbol: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={HouseSbol} />;
};
