import React from 'react';

import { Hotel } from '../Icon.assets/Hotel';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHotel: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Hotel} />;
};
