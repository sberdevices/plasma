import React from 'react';

import { VideoClip } from '../Icon.assets/VideoClip';
import { IconRoot, IconProps } from '../IconRoot';

export const IconVideoClip: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={VideoClip} />;
};
