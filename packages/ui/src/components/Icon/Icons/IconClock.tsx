import React from 'react';

import { ReactComponent as Clock } from '../Icon.assets/clock.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconClock: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Clock} />;
};
