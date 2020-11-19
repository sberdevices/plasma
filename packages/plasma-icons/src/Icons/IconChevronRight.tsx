import React from 'react';

import { ChevronRight } from '../Icon.assets/ChevronRight';
import { IconRoot, IconProps } from '../IconRoot';

export const IconChevronRight: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ChevronRight} />;
};
