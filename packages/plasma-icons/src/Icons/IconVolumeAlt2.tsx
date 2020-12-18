import React from 'react';

import { VolumeAlt2 } from '../Icon.assets/VolumeAlt2';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVolumeAlt2: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VolumeAlt2} />;
};
