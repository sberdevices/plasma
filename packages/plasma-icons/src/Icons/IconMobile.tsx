import React from 'react';

import { Mobile } from '../Icon.assets/Mobile';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMobile: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Mobile} />;
};
