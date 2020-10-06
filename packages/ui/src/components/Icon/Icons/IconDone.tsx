import React from 'react';

import done from '../Icon.assets/done.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconDone: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={done} />;
};
