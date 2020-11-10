import React from 'react';

import { MoreVertical } from '../Icon.assets/MoreVertical';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMoreVertical: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MoreVertical} />;
};
