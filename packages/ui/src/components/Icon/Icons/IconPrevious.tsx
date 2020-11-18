import React from 'react';

import { Previous } from '../Icon.assets/Previous';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPrevious: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Previous} />;
};
