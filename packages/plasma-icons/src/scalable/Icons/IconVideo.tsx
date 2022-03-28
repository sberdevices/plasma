import React from 'react';

import { Video } from '../Icon.assets/Video';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVideo: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Video} />;
};
