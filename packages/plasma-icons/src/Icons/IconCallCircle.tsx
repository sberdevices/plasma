import React from 'react';

import { CallCircle } from '../Icon.assets/CallCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCallCircle: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CallCircle} />;
};
