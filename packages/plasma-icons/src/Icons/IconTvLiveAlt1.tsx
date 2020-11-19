import React from 'react';

import { TvLiveAlt1 } from '../Icon.assets/TvLiveAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvLiveAlt1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvLiveAlt1} />;
};
