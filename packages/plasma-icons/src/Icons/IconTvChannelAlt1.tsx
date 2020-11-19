import React from 'react';

import { TvChannelAlt1 } from '../Icon.assets/TvChannelAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvChannelAlt1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvChannelAlt1} />;
};
