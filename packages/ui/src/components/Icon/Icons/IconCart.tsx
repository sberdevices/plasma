import React from 'react';

import { ReactComponent as Cart } from '../Icon.assets/cart.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCart: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Cart} />;
};
