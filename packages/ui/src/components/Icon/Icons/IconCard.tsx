import React from 'react';

import { Card } from '../Icon.assets/Card';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCard: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Card} />;
};
