import React from 'react';

import { Headphones } from '../Icon.assets/Headphones';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHeadphones: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Headphones} />;
};
