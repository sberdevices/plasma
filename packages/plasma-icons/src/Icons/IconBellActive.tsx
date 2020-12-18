import React from 'react';

import { BellActive } from '../Icon.assets/BellActive';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBellActive: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={BellActive} />;
};
