import React from 'react';

import { NavigationArrow } from '../Icon.assets/NavigationArrow';
import { IconRoot, IconProps } from '../IconRoot';

export const IconNavigationArrow: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={NavigationArrow} />;
};
