import React from 'react';

import { TvAlt1 } from '../Icon.assets/TvAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvAlt1: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvAlt1} />;
};
