import React from 'react';

import cart from '../Icon.assets/cart.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconCart: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={cart} />;
};
