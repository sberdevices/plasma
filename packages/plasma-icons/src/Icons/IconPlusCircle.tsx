import React from 'react';

import { PlusCircle } from '../Icon.assets/PlusCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlusCircle: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={PlusCircle} />;
};
