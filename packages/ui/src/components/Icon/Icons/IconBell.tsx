import React from 'react';

import { Bell } from '../Icon.assets/Bell';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBell: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Bell} />;
};
