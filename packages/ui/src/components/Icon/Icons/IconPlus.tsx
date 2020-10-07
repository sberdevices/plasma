import React from 'react';

import { ReactComponent as Plus } from '../Icon.assets/plus.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconPlus: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Plus} />;
};
