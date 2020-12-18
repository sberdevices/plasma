import React from 'react';

import { Settings } from '../Icon.assets/Settings';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSettings: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Settings} />;
};
