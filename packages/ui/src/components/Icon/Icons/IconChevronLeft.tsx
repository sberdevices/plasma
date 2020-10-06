import React from 'react';

import chevronLeft from '../Icon.assets/chevron-left.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconChevronLeft: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={chevronLeft} />;
};
