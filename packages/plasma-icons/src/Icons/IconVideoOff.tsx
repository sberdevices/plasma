import React from 'react';

import { VideoOff } from '../Icon.assets/VideoOff';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVideoOff: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VideoOff} />;
};
