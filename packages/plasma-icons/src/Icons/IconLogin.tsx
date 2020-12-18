import React from 'react';

import { Login } from '../Icon.assets/Login';
import { IconRoot, IconProps } from '../IconRoot';

export const IconLogin: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Login} />;
};
