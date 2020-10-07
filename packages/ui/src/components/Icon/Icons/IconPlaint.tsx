import React from 'react';

import { ReactComponent as Plaint } from '../Icon.assets/plaint.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconPlaint: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Plaint} />;
};
