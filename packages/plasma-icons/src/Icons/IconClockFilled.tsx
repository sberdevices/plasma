import React from 'react';

import { ClockFilled } from '../Icon.assets/ClockFilled';
import { IconRoot, IconProps } from '../IconRoot';

export const IconClockFilled: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ClockFilled} />;
};
