import React from 'react';

import { Star } from '../Icon.assets/Star';
import { IconRoot, IconProps } from '../IconRoot';

export const IconStar: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Star} />;
};
