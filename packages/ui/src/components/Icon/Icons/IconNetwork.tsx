import React from 'react';

import { Network } from '../Icon.assets/Network';
import { IconRoot, IconProps } from '../IconRoot';

export const IconNetwork: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Network} />;
};
