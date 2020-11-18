import React from 'react';

import { VolumeAlt1 } from '../Icon.assets/VolumeAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVolumeAlt1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VolumeAlt1} />;
};
