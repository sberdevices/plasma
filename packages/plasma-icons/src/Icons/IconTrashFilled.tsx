import React from 'react';

import { TrashFilled } from '../Icon.assets/TrashFilled';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTrashFilled: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={TrashFilled} />;
};
