import React from 'react';

import { VolumeDown } from '../Icon.assets/VolumeDown';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVolumeDown: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VolumeDown} />;
};
