import React from 'react';

import { Cart } from '../Icon.assets/Cart';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCart: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Cart} />;
};
