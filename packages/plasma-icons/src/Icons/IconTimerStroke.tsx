import React from 'react';

import { TimerStroke } from '../Icon.assets/TimerStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTimerStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TimerStroke} />;
};
