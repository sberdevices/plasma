import React from 'react';

import { TimerFill } from '../Icon.assets/TimerFill';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTimerFill: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TimerFill} />;
};
