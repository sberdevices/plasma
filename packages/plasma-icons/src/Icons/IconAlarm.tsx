import React from 'react';

import { Alarm } from '../Icon.assets/Alarm';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAlarm: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Alarm} />;
};
