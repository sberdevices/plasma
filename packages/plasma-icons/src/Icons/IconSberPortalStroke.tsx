import React from 'react';

import { SberPortalStroke } from '../Icon.assets/SberPortalStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberPortalStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberPortalStroke} />;
};
