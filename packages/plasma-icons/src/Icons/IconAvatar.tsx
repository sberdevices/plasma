import React from 'react';

import { Avatar } from '../Icon.assets/Avatar';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAvatar: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Avatar} />;
};
