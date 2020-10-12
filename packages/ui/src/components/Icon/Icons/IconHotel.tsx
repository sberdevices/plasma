import React from 'react';

import { ReactComponent as Hotel } from '../Icon.assets/hotel.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHotel: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Hotel} />;
};
