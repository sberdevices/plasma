import React from 'react';

import { ReactComponent as Minus } from '../Icon.assets/minus.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconMinus: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Minus} />;
};
