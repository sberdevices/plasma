import React from 'react';

import forward from '../Icon.assets/forward.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconForward: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={forward} />;
};
