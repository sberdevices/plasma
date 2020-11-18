import React from 'react';

import { Help } from '../Icon.assets/Help';
import { IconRoot, IconProps } from '../IconRoot';

export const IconHelp: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Help} />;
};
