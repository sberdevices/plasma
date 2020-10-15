import React from 'react';

import { Clock } from '../Icon.assets/Clock';
import { IconRoot, IconProps } from '../IconRoot';

export const IconClock: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Clock} />;
};
