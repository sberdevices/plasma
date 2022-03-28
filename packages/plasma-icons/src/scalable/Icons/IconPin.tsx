import React from 'react';

import { Pin } from '../Icon.assets/Pin';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPin: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Pin} />;
};
