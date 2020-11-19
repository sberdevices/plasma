import React from 'react';

import { CamReverse } from '../Icon.assets/CamReverse';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCamReverse: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CamReverse} />;
};
