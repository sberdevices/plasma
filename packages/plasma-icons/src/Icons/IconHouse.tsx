import React from 'react';

import { House } from '../Icon.assets/House';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHouse: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={House} />;
};
