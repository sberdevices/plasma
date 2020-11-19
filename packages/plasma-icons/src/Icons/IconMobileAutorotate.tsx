import React from 'react';

import { MobileAutorotate } from '../Icon.assets/MobileAutorotate';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMobileAutorotate: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MobileAutorotate} />;
};
