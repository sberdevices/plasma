import React from 'react';

import { ArrowUp } from '../Icon.assets/ArrowUp';
import { IconRoot, IconProps } from '../IconRoot';

export const IconArrowUp: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ArrowUp} />;
};
