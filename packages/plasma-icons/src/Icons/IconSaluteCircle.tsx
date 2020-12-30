import React from 'react';

import { SaluteCircle } from '../Icon.assets/SaluteCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSaluteCircle: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SaluteCircle} />;
};
