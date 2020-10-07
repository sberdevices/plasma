import React from 'react';

import { ReactComponent as Remove } from '../Icon.assets/remove.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconRemove: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Remove} />;
};
