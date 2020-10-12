import React from 'react';

import { ReactComponent as Plus } from '../Icon.assets/plus.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlus: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Plus} />;
};
