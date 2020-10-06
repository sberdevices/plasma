import React from 'react';

import pause from '../Icon.assets/pause.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconPause: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={pause} />;
};
