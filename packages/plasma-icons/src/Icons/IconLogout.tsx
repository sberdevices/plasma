import React from 'react';

import { Logout } from '../Icon.assets/Logout';
import { IconRoot, IconProps } from '../IconRoot';

export const IconLogout: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Logout} />;
};
