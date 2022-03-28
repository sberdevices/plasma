import React from 'react';

import { CallCircle } from '../Icon.assets/CallCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCallCircle: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CallCircle} />;
};
