import React from 'react';

import { VolumeUp } from '../Icon.assets/VolumeUp';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVolumeUp: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VolumeUp} />;
};
