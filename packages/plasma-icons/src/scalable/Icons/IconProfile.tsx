import React from 'react';

import { Profile } from '../Icon.assets/Profile';
import { IconRoot, IconProps } from '../IconRoot';

export const IconProfile: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Profile} />;
};
