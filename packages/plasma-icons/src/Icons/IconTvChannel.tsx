import React from 'react';

import { TvChannel } from '../Icon.assets/TvChannel';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvChannel: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvChannel} />;
};
