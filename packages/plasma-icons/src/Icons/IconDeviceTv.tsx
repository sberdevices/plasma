import React from 'react';

import { DeviceTv } from '../Icon.assets/DeviceTv';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDeviceTv: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DeviceTv} />;
};
