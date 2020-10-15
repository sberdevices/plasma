import React from 'react';

import { Forward } from '../Icon.assets/Forward';
import { IconRoot, IconProps } from '../IconRoot';

export const IconForward: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Forward} />;
};
