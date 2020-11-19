import React from 'react';

import { VolumeOff } from '../Icon.assets/VolumeOff';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVolumeOff: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VolumeOff} />;
};
