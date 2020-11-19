import React from 'react';

import { Eye } from '../Icon.assets/Eye';
import { IconRoot, IconProps } from '../IconRoot';

export const IconEye: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Eye} />;
};
