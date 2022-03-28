import React from 'react';

import { Calendar } from '../Icon.assets/Calendar';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCalendar: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Calendar} />;
};
