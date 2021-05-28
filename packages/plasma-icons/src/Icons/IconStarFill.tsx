import React from 'react';

import { StarFill } from '../Icon.assets/StarFill';
import { IconRoot, IconProps } from '../IconRoot';

export const IconStarFill: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={StarFill} />;
};
