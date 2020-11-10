import React from 'react';

import { MoreHorizontal } from '../Icon.assets/MoreHorizontal';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMoreHorizontal: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MoreHorizontal} />;
};
