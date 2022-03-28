import React from 'react';

import { ChevronDown } from '../Icon.assets/ChevronDown';
import { IconRoot, IconProps } from '../IconRoot';

export const IconChevronDown: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ChevronDown} />;
};
