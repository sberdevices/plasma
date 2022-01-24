import React from 'react';

import { TvModeWiFi } from '../Icon.assets/TvModeWiFi';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTvModeWiFi: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TvModeWiFi} />;
};
