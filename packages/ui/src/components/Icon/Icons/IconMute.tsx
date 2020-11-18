import React from 'react';

import { Mute } from '../Icon.assets/Mute';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMute: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Mute} />;
};
