import React from 'react';

import { Cross } from '../Icon.assets/Cross';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCross: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Cross} />;
};
