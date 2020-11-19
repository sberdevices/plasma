import React from 'react';

import { ChevronUp } from '../Icon.assets/ChevronUp';
import { IconRoot, IconProps } from '../IconRoot';

export const IconChevronUp: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ChevronUp} />;
};
