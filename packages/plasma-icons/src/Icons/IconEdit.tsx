import React from 'react';

import { Edit } from '../Icon.assets/Edit';
import { IconRoot, IconProps } from '../IconRoot';

export const IconEdit: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Edit} />;
};
