import React from 'react';

import { TvLive } from '../Icon.assets/TvLive';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvLive: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvLive} />;
};
