import React from 'react';

import { MicOff } from '../Icon.assets/MicOff';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMicOff: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MicOff} />;
};
