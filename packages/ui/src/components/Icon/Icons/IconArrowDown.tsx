import React from 'react';

import { ArrowDown } from '../Icon.assets/ArrowDown';
import { IconRoot, IconProps } from '../IconRoot';

export const IconArrowDown: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ArrowDown} />;
};
