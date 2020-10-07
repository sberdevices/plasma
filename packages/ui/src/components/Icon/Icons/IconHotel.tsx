import React from 'react';

import { ReactComponent as Hotel } from '../Icon.assets/hotel.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconHotel: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Hotel} />;
};
