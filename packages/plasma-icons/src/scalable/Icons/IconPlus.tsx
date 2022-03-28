import React from 'react';

import { Plus } from '../Icon.assets/Plus';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlus: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Plus} />;
};
