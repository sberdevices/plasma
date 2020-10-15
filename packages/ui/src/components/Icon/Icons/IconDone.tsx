import React from 'react';

import { Done } from '../Icon.assets/Done';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDone: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Done} />;
};
