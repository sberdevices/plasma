import React from 'react';

import { HeartStroke } from '../Icon.assets/HeartStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHeartStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={HeartStroke} />;
};
