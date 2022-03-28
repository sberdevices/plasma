import React from 'react';

import { Add } from '../Icon.assets/Add';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAdd: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Add} />;
};
