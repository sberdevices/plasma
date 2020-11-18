import React from 'react';

import { Refresh } from '../Icon.assets/Refresh';
import { IconRoot, IconProps } from '../IconRoot';

export const IconRefresh: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Refresh} />;
};
