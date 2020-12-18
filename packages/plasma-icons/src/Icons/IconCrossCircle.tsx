import React from 'react';

import { CrossCircle } from '../Icon.assets/CrossCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCrossCircle: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CrossCircle} />;
};
