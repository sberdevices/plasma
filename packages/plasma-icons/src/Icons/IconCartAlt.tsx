import React from 'react';

import { CartAlt } from '../Icon.assets/CartAlt';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCartAlt: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CartAlt} />;
};
