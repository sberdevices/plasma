import React from 'react';

import { TvMode } from '../Icon.assets/TvMode';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvMode: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvMode} />;
};
