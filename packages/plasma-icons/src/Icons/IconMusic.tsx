import React from 'react';

import { Music } from '../Icon.assets/Music';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMusic: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Music} />;
};
