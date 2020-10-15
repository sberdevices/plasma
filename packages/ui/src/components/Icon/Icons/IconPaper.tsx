import React from 'react';

import { Paper } from '../Icon.assets/Paper';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPaper: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Paper} />;
};
