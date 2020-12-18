import React from 'react';

import { Pause } from '../Icon.assets/Pause';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPause: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Pause} />;
};
