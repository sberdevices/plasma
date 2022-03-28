import React from 'react';

import { EndCallCircle } from '../Icon.assets/EndCallCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconEndCallCircle: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={EndCallCircle} />;
};
