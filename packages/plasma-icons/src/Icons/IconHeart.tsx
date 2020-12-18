import React from 'react';

import { Heart } from '../Icon.assets/Heart';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHeart: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Heart} />;
};
