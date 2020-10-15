import React from 'react';

import { Play } from '../Icon.assets/Play';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlay: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Play} />;
};
