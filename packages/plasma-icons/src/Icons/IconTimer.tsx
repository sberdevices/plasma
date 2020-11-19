import React from 'react';

import { Timer } from '../Icon.assets/Timer';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTimer: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Timer} />;
};
